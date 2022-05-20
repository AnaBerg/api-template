import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';

import encodeSession from "../security/encoding";
import db from "../database/db";
import error from "../helpers/error";
import UserService from "../service/user_service";

const userService = new UserService;

export default class SessionController {
  async authentication(req: Request, res: Response) {
    const secretKey = process.env.TOKEN_KEY as string;
    const createdAt = new Date();
    const { user } = req.body;
    
    const validUser = await userService.findUserById(res, user);

    if (validUser) {
      try {
        const session = encodeSession(secretKey, { id: uuid(), user, createdAt, type: validUser.type });

        await userService.updateUser(res, { ...validUser, token: session.token });

        return res.status(200).json(session);
      } catch (e) {
        return error(res, "Something went wrong while creating new session", e as Error);
      }
    } else  {
      return error(res, "User invalid");
    }


  }
}