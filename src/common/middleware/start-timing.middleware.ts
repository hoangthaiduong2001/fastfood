import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class StartTimingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['startTime'] = Date.now();
    next();
  }
}
