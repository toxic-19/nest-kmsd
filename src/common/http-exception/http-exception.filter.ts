/**
 * 异常过滤器
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException) // 捕获异常拦截
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response.status(status).json({
      // 异常时返回的错误信息json
      code: status,
      // timestamp: new Date().toISOString(),
      path: request.url,
      data: exception.message,
      success: false,
    })
  }
}
