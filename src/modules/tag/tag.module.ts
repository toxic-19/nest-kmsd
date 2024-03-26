import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Tag } from './model/tag.model'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { ArticleModule } from '../article/article.module'

@Module({
  // 在tagService中使用其他模块的服务，需要在import中导入
  imports: [SequelizeModule.forFeature([Tag]), ArticleModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
