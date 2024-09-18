import { Request, Response } from "express";
import userService from "../service/impl/user.service.impl";
import { createUserSchema, findUserIdShema } from "../schemas/user.schema";
import { ZodError } from "zod";

export namespace UserController {

   export const createUser = async (req: Request, res: Response):Promise<Response> => {
       try {
            const user = createUserSchema.parse(req.body);
            const createUser = await userService.createUser(user);
            console.log(`User created: ${createUser}`);
            return res.status(201).json(`User created: ${createUser}`);
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
            console.log(`Users found: ${users}`);
            return res.status(200).json(`Users found: ${users}`);
       } catch (error) {
            return res.status(400).json({ message: `Error finding users: ${error}` });
       }
   }

   export const findUserById = async (req: Request, res: Response):Promise<Response> => {
       try {
            const idUser = findUserIdShema.parse(req.params);
            const user = await userService.findUserById(idUser.id);
            console.log(`User id:${idUser.id} User name: ${user?.name}, User email: ${user?.email}`);
            return res.status(200).json(`User id:${idUser.id} User name: ${user?.name}, User email: ${user?.email}`);
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
            const oldUser = await userService.findUserById(idParam.id);
            const user = createUserSchema.parse(req.body);
            const updateUser = await userService.updateUser(idParam.id, user);
            console.log(`Old user: ${oldUser}, New user: ${updateUser}`);
            return res.status(200).json(`User updated: ${updateUser}`);
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
            console.log(`User deleted: ${deleteUser}`);
            return res.status(200).json(`User deleted: ${deleteUser}`);
        } catch (error) {
            return res.status(400).json({ message: `Error deleting user: ${error}` });
        }
   }
}