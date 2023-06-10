import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { logger } from './logger/logger.middleware';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 在main.ts中注册全局中间件,只能是函数中间件
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局使用异常处理器 比如不存在的路径
  await app.listen(3001, () => {
    Logger.log('node服务器已启动');
  });
}
bootstrap();
