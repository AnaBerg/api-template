import { Request, Response } from "express";

export default class TestController {
  async test(req: Request, res: Response) {
    return res.status(200).json({
      message: "Não confias nas config da mãe"
    });
  }
}