import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { KnowLedge } from './model/knowLedge.model'
import { KnowledgeBaseController } from './knowledge-base.controller'
import { KnowledgeBaseService } from './knowledge-base.service'

@Module({
  imports: [SequelizeModule.forFeature([KnowLedge])],
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService],
  exports: [SequelizeModule],
})
export class KnowledgeBaseModule {}
