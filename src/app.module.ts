import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule], // 导入模块到AppModule里面，避免所有的Controller和Service都在AppModule里面导致太杂乱
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
