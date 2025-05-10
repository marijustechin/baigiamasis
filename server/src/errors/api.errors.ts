import { StatusCodes } from 'http-status-codes';

export default class ApiError extends Error {
  statusCode: number;
  errors: unknown[]; // unknown tam, kad butu galima sukisti zod klaidas

  constructor(statusCode: number, message: string, errors: unknown[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Iki galo neissiaiskinau, bet reikalingas kai tikrinam "instanceof"
    //  (susije su pavedejimu is tevo ir proteviu)
    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }

  static NoContent() {
    return new ApiError(StatusCodes.NO_CONTENT, 'No Content');
  }

  static Unauthorized() {
    return new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
  }

  static Forbidden() {
    return new ApiError(StatusCodes.FORBIDDEN, 'No permission');
  }

  static NotFound() {
    return new ApiError(StatusCodes.NOT_FOUND, 'Not found');
  }

  static Conflict(message: string, errors: unknown[] = []) {
    return new ApiError(StatusCodes.CONFLICT, message, errors);
  }

  static BadRequest(message: string, errors: unknown[] = []) {
    return new ApiError(StatusCodes.BAD_REQUEST, message, errors);
  }
}
