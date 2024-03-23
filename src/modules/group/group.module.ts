import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Group } from './model/group.model'
import { OneLevel } from './model/one-level.model'
import { ArticleModule } from '../article/article.module'
import { GroupArticle } from './model/group-article.model'

@Module({
  imports: [SequelizeModule.forFeature([Group, OneLevel, GroupArticle]), ArticleModule],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupModule],
})
export class GroupModule {}
