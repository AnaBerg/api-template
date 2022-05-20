import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/db';
import error from '../helpers/error';
import UserService from '../service/user_service';
import { comparePassword, encryptPassword } from '../security/password_encryption';
import encodeSession from '../security/encoding';

import { IUserPost } from '../entities/user';

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
  async login(req: Request, res: Response) {
    const secretKey = process.env.TOKEN_KEY as string;
    const { email, password } = req.body;
    const createdAt = new Date();

    try {
      const user = await userService.findUserByEmail(res, email);
      const encryptPass = await encryptPassword(password);
      const validPassword = await comparePassword(password, encryptPass);
      if (validPassword) {
        const session = encodeSession(secretKey, { id: uuid(), user: user.id, createdAt, type: user.type });
        await userService.updateUser(res, { ...user, token: session.token });
        res.status(200).json({
          message: "Login successfully",
          user: {
            name: user.name,
            type: user.type,
            token: session.token
          }
        })
      }
    } catch (e) {
      return error(res, "Something went wrong while trying to login", e as Error);
    }
  }
}