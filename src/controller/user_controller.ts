import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/db';
import error from '../helpers/error';

import { IUserPost } from '../entities/user';


export default class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await db("users");
      return res.status(200).json(users);
    } catch (e) {
      return error(res, 'Somethin went wrong while getting all users', e as Error);
    }
    
  }
  
  async create(req: Request, res: Response) {
    const { email, name, password, type } = req.body as IUserPost;
    const transaction = await db.transaction();
    const newUser = {
      id: uuid(),
      email,
      name,
      password,
      type
    }

    try {
      await transaction("users").insert(newUser);

      await transaction.commit();

      return res.status(201).json({
        message: "User created successfully",
        user: newUser
      })
    } catch (e) {
      await transaction.rollback();

      return error(res, "Something went wrong while creating new user", e as Error);
    }
  }
}