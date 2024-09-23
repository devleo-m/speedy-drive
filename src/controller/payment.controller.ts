import { Request, Response } from "express";
import { ZodError } from "zod";
import { paymentSchema, paymentUpdateSchema } from "../schemas/payment.schema";
import paymentService from "../service/impl/payment.service.impl";
import { IdSchema } from "../schemas/id.schema";

export namespace PaymentController{
    export const createPayment = async (req: Request, res: Response): Promise<Response> => {
        try {
            const paymentBody = paymentSchema.parse(req.body);
            const createPayment = await paymentService.createPayment(paymentBody);
            return res.status(201).json(createPayment);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}`});
            }
            return res.status(400).json({ message: `Error creating payment: ${error}`});
        }
    }

    export const listAllPayments = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payments = await paymentService.findAllPayments();
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(400).json({ message: `Error listing payments: ${error}`});
        }
    }

    export const listPaymentById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const payment = await paymentService.findByIdPayment(idParam);
            return res.status(200).json(payment);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}`});
            }
            return res.status(400).json({ message: `Error listing payment: ${error}`});
        }
    }

    export const updatePayment = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const paymentBody = paymentUpdateSchema.parse(req.body);
            const updatePayment = await paymentService.updatePayment(idParam, paymentBody);
            return res.status(200).json(updatePayment);
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}`});
            }
            return res.status(400).json({ message: `Error updating payment: ${error}`});
        }
    }

    export const deletePayment = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const deletePayment = await paymentService.deletePayment(idParam);
            return res.status(200).json({ message: `Payment deleted successfully`, payment: deletePayment});
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}`});
            }
            return res.status(400).json({ message: `Error deleting payment: ${error}`});
        }
    }
}