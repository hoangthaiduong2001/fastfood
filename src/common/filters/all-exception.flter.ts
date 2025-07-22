import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APIResponse } from '../interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const startTime = request['startTime'];
    const endTime = Date.now();
    const takenTime = `${endTime - startTime}ms`;
    let status: number;
    let message: string = 'Something went wrong';
    let error: any;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const exceptionResponseObj = exceptionResponse as Record<string, any>;
        message =
          exceptionResponseObj.message ||
          exceptionResponseObj.error ||
          'Something went wrong';
        if (Array.isArray(exceptionResponseObj.message)) {
          message = 'Data invalid';
          error = exceptionResponseObj.message;
        }
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'System error';
      this.logger.log(exception);
    }
    const errResponse: APIResponse<any> = {
      success: false,
      message,
      ...(error && { error }),
      date: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      }),
      path: request.url,
      takenTime,
    };
    response.status(status).json(errResponse);
  }
}
