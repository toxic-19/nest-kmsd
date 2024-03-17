import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { Article } from './model/article.model'

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
