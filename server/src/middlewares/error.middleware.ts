import ApiError from '../errors/api.errors';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  // issiloginam sau klaida vis tiek
  console.error('Unexpeceded Server Error', err);

  res.status(500).json({
    message: 'Internal Server Error',
    error: err instanceof Error ? err.message : String(err),
  });
};

export default errorMiddleware;
