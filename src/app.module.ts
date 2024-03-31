import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { LoggerMiddleware } from './common/logger/logger.middleware'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './modules/user/model/user.model'
import { CategoryModule } from './modules/category/category.module'
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module'
import { KnowLedge } from '~/modules/knowledge-base/model/knowLedge.model'
import { databaseConfig } from './config/database'
import { GroupModule } from './modules/group/group.module'
import { Group } from './modules/group/model/group.model'
import { ArticleModule } from './modules/article/article.module'
import { OneLevel } from './modules/group/model/one-level.model'
import { Article } from './modules/article/model/article.model'
import { TagModule } from './modules/tag/tag.module'
import { Tag } from './modules/tag/model/tag.model'
import { ArticleTag } from './modules/article/model/articleTag.model'
import { UploadModule } from './modules/upload/upload.module'
@Module({
  imports: [
    SequelizeModule.forRoot({
      // 导入数据库配置
      ...databaseConfig,
      models: [User, KnowLedge, Group, OneLevel, Article, Tag, ArticleTag], // 实体模型注册，让Sequelize知道存在
    }),
    UserModule,
    CategoryModule,
    KnowledgeBaseModule,
    GroupModule,
    ArticleModule,
    TagModule,
    UploadModule,
  ], // 导入模块到AppModule里面，避免所有的Controller和Service都在AppModule里面导致太杂乱
  controllers: [AppController],
  providers: [AppService], // 实例化的提供者
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件时将包含路由路径的对象和请求方法传递给forRoutes()方法
    consumer
      .apply(LoggerMiddleware) // 也可以指定多个中间件
      .exclude(
        // 需要排除的路由
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST },
        'user/(.*)',
      )
      // .forRoutes({ path: 'user', method: RequestMethod.GET }); // 如果只是路由路径就不需要对象形式 path还支持路由匹配
      .forRoutes(AppController) // 当然也可以接受一个或多个控制器
  }
}
