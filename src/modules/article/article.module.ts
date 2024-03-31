import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { GroupModule } from '../group/group.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { Article } from './model/article.model'
import { ArticleTag } from './model/articleTag.model'
import { TagModule } from '~/modules/tag/tag.module'

@Module({
  imports: [SequelizeModule.forFeature([Article, ArticleTag]), forwardRef(() => GroupModule), forwardRef(() => TagModule)],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
