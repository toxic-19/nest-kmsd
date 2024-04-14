import { SparkService } from './spark.service'
import { SparkController } from './spark.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Session, History } from './model/spark.model'
import { Module } from '@nestjs/common'

@Module({
  imports: [SequelizeModule.forFeature([Session, History])],
  controllers: [SparkController],
  providers: [SparkService],
})
export class SparkModule {}
