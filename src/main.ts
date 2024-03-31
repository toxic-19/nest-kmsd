import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { logger } from './common/logger/logger.middleware'
import { Response } from './common/interceptor/response'
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express/interfaces'
import { join } from 'path'

async function bootstrap() {
  // 显示配置 NestExpressApplication 类型, 以获取更好的语法提示
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 接口统一前缀
  app.setGlobalPrefix('kmsd-api')
  // 在main.ts中注册全局中间件,只能是函数中间件
  app.use(logger)
  app.useGlobalInterceptors(new Response()) // 定义全局-响应拦截器
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter()) // 全局使用异常过滤器 比如不存在的路径
  app.useStaticAssets(join(__dirname, '../images'), { prefix: '/doc' })
  const config = new DocumentBuilder() // swagger文档相关配置 在category模块进行配置参考
    .setTitle('InitNest swagger')
    .setDescription('The initNest API description')
    .setVersion('1.0')
    .addTag('toxic-19')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document) // 定义并初始化SwaggerModule类: 在 http://localhost:3001/api-docs 就可以看到Swagger文档
  await app.listen(3001, () => {
    Logger.log('node服务器已启动 in http://localhost:3001')
  })
}
bootstrap()
