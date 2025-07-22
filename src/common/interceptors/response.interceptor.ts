import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse } from '../interface';
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, APIResponse<T>>
{
  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'GET':
        return 'Get data successfully';
      case 'POST':
        return 'Create successfully';
      case 'PATCH':
        return 'Update successfully';
      case 'DELETE':
        return 'Delete successfully';
      default:
        return 'Request completed';
    }
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<APIResponse<T>> | Promise<Observable<APIResponse<T>>> {
    const request = context.switchToHttp().getRequest();
    const startTime = request['startTime'];
    const endTime = Date.now();
    const takenTime = `${endTime - startTime}ms`;
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'message' in data
        ) {
          return data as APIResponse<T>;
        }
        let finalMessage = this.getDefaultMessage(request.method) as string;
        if (data && typeof data === 'object' && 'message' in data) {
          finalMessage = data.message as string;
          const { message, ...rest } = data;
          data = Object.keys(rest).length > 0 ? rest : undefined;
        }

        if (data && typeof data === 'object' && 'data' in data) {
          data = data.data as T;
        }
        return {
          success: true,
          message: finalMessage,
          data,
          date: new Date().toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour12: false,
          }),
          path: request.url,
          takenTime,
        };
      }),
    );
  }
}
