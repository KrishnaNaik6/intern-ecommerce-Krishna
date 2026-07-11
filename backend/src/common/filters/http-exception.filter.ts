import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: HttpException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const request = ctx.getRequest();

    const status = exception.getStatus();

    const error = exception.getResponse();

    response.status(status).json({
      success: false,
      statusCode: status,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}