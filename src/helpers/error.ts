import { Response } from "express";

const error = (res: Response, message: string, error?: Error) => res.status(400).json({
  ok: false,
  status: 400,
  message,
  error,
});

export default error;