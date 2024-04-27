import { SparkService } from './spark.service'
import { SparkController } from './spark.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Session, History, UploadFile } from './model/spark.model'
import { Module } from '@nestjs/common'
import { ArticleModule } from '../article/article.module'

@Module({
  imports: [SequelizeModule.forFeature([Session, History, UploadFile]), ArticleModule],
  controllers: [SparkController],
  providers: [SparkService],
})
export class SparkModule {}
