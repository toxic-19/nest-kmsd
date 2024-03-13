import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map, Observable } from 'rxjs'
/**
 * 响应拦截器
 */
class ExecutionContext {
  [x: string]: any
}
class Data<T> {
  data: T
}
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    return next.handle().pipe(
      map((data) => {
        const httpStatus = data && data.httpStatus ? data.httpStatus : 1
        const responseMessage = data && data.responseMessage ? data.responseMessage : '操作成功'
        const responseData = data && data.httpStatus ? null : data

        return {
          code: 0,
          data: responseData,
          ok: httpStatus,
          message: responseMessage,
        }
      }),
    )
  }
}
