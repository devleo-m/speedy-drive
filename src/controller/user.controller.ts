import { Request, Response } from "express";
import userService from "../service/impl/user.service.impl";
import { createUserSchema, findUserIdShema } from "../schemas/user.schema";
import { ZodError } from "zod";

export namespace UserController {

   export const createUser = async (req: Request, res: Response):Promise<Response> => {
       try {
            const user = createUserSchema.parse(req.body);
            const createUser = await userService.createUser(user);
            return res.status(201).json(createUser);
       } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        return res.status(400).json({ message: `Error creating user: ${error}` });
        }
   }

   export const findAllUsers = async (req: Request, res: Response):Promise<Response> => {
       try {
            const users = await userService.findAllUsers();
            return res.status(200).json(users);
       } catch (error) {
            return res.status(400).json({ message: `Error finding users: ${error}` });
       }
   }

   export const findUserById = async (req: Request, res: Response):Promise<Response> => {
       try {
            const idParam = findUserIdShema.parse(req.params);
            const user = await userService.findUserById(idParam.id);
            return res.status(200).json(user);
       } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation failed", errors: error.errors });
            }
            return res.status(400).json({ message: `Error finding user: ${error}` });
       }
   }

   export const updateUser = async (req: Request, res: Response):Promise<Response> => {
        try {
            const idParam = findUserIdShema.parse(req.params);
            const user = createUserSchema.parse(req.body);
            const updateUser = await userService.updateUser(idParam.id, user);
            return res.status(200).json(updateUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation failed", errors: error.errors });
            }
            return res.status(400).json({ message: `Error updating user: ${error}` });
        }
   }

   export const deleteUser = async (req: Request, res: Response):Promise<Response> => {
        try {
            const idParam = findUserIdShema.parse(req.params);
            const deleteUser = await userService.deleteUser(idParam.id);
            return res.status(200).json({ message: `User deleted successfully`, user: deleteUser });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation failed", errors: error.errors });
            }
            return res.status(400).json({ message: `Error deleting user: ${error}` });
        }
   }
}