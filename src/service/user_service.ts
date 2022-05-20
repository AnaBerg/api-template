import { Response } from "express";

import db from "../database/db";
import error from "../helpers/error";

import { IUser, IUserPost } from "../entities/user";

export default class UserService {
  async findUserById(res: Response, id: string,) {
    try {
      const user = await db("users").where({ id });
      return user[0];
    } catch (e) {
      return error(res, "Something went wrong while trying to find the user by id", e as Error);
    }
  }
  async findUserByEmail(res: Response, email: string) {
    try {
      const user = await db("users").where({ email });
      return user[0];
    } catch (e) {
      return error(res, "Something went wron while trying to find the user by e-mail", e as Error)
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
  async addNewUser(res: Response, user: IUserPost) {
    const transaction = await db.transaction();
    try {
      await transaction("users").insert(user);
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      return error(res, "Something went wrong while trying to create the new user", e as Error);
    }
  }
}