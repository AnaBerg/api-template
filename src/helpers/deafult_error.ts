import { Response } from "express";

const defaultError = (res: Response, action: string, error: Error) => res.status(400).json({
  message: 'An error occurred while trying to perfom',
  error,
});

export default defaultError;