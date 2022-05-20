import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/db';
import error from '../helpers/error';
import UserService from '../service/user_service';

import { IUserPost } from '../entities/user';
import { encryptPassword } from '../security/password_encryption';

const userService = new UserService();

export default class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await db("users");
      return res.status(200).json(users);
    } catch (e) {
      return error(res, 'Something went wrong while getting all users', e as Error);
    }
    
  }
  
  async create(req: Request, res: Response) {
    const { email, name, password, type } = req.body as IUserPost;
    const transaction = await db.transaction();

    try {
      const sameEmailUser = await userService.findUserByEmail(res, email);
      if (sameEmailUser.length != 0) return error(res, "E-mail already exist");

      const encryptPass = await encryptPassword(password);

      const newUser = {
        id: uuid(),
        email,
        name,
        password: encryptPass,
        type
      }
      
      await userService.addNewUser(res, newUser);

      return res.status(201).json({
        message: "User created successfully",
        user: newUser
      });
    } catch (e) {
      return error(res, "Something went wrong while creating new user", e as Error);
    }
  }
}