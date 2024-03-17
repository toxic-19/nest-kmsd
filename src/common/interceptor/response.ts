import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map, Observable } from 'rxjs'
/**
 * 响应拦截器
 * 拦截器：1. 函数执行前后绑定额外的逻辑 2. 转换从函数返回的结果 3. 转换从函数抛出的异常
 * 声明一个泛型类 response<T>
 * next: 调用处理程序
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
      // next.handle() 拦截响应数据
      map((data) => {
        const httpStatus = data && data.httpStatus ? data.httpStatus : 200
        const responseMessage = data && data.responseMessage ? data.responseMessage : '操作成功'
        const responseData = data && data.httpStatus ? null : data
        return {
          code: httpStatus,
          data: responseData,
          message: responseMessage,
          success: true,
        }
      }),
    )
  }
}
