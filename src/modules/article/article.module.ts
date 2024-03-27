import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { GroupModule } from '../group/group.module'
import { GroupService } from '../group/group.service'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { Article } from './model/article.model'
import { ArticleTag } from './model/articleTag.model'

@Module({
  imports: [SequelizeModule.forFeature([Article, ArticleTag]), forwardRef(() => GroupModule)],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
