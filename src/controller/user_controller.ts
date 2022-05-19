import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import db from '../database/db';
import defaultError from '../helpers/deafult_error';

import { IUserPost } from '../entities/user';


export default class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await db("users");
      return res.status(200).json(users);
    } catch (error) {
      return defaultError(res, 'getAll users', error as Error);
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
    } catch (error) {
      await transaction.rollback();

      return res.status(400).json({
        message: "An error occured while creating the user",
        error
      })
    }
  }
}