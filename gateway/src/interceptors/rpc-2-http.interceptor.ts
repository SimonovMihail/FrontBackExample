import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor
} from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

/**
 * Перехватчик ошибок (исключений) из микросервисов
 * (чтобы исключение было передано в gateway, нужно преобразовать RpcException в HttpException)
 */
@Injectable()
export class Rpc2HttpExceptionInterceptor implements NestInterceptor {
  public readonly _logger = new Logger(Rpc2HttpExceptionInterceptor.name);

  public intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        const status = error.statusCode || error.status || 500;

        // Если ошибка - массив ошибок
        if (error instanceof AggregateError) {
          this._logger.error(error.errors);

          return throwError(
            () =>
              new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }

        return throwError(() => new HttpException(error.message, status));
      }),
    );
  }
}