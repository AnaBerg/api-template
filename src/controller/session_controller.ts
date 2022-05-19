import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';

import encodeSession from "../security/encoding";

export default class SessionController {
  async logIn(req: Request, res: Response) {
    const secretKey = process.env.TOKEN_KEY as string;
    const { user } = req.body;
    const createdAt = new Date();
    // TODO: validate user

    const session = encodeSession(secretKey, { id: uuid(), user, createdAt });

    res.status(200).json(session);
  }
}