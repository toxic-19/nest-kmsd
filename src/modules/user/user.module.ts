/**
 * 快捷键：nest g mo user 即可快速创建一个 Module文件
 */
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './model/user.model'

@Module({
  imports: [SequelizeModule.forFeature([User])], // 使用forFeature()方法来定义哪个模型被注册在当前范围中。
  // 使用forFeature导入模型后就可以操作模型和数据库表了
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}
