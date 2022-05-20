import { Response } from "express";

import db from "../database/db";
import error from "../helpers/error";

import { IUser } from "../entities/user";

export default class UserService {
  async findUserById(res: Response, id: string,) {
    try {
      const user = await db("users").where({ id });
      if (user.length > 1) {
        return error(res, "More than one user was found");
      } else {
        return user[0];
      }
    } catch (e) {
      return error(res, "Something went wrong while trying to find the user by id", e as Error);
    }
  }
  async updateUser(res: Response, user: IUser) {
    const transaction = await db.transaction();
    try {
      await transaction("users").where({ id: user.id }).update(user);
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      return error(res, "Something went wrong while trying to update the user", e as Error);
    }
  }
}