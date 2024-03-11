/**
 * 中间件 中间件不能在 @Module() 装饰器中列出【比如mysql】。我们必须使用模块类的 configure() 方法来设置它们。
 * 包含中间件的模块必须实现 NestModule 接口。我们将 LoggerMiddleware 设置在 ApplicationModule 层上。
 * 我们在AppModule文件实现
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Logger.log('Request...')
    next()
  }
}

// 可以在此定义一个函数中间件
export function logger(req, res, next) {
  Logger.log(req)
  console.log('函数中间件 Request...')
  Logger.log(res)
  next()
}
