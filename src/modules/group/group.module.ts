import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Group } from './model/group.model'
import { OneLevel } from './model/one-level.model'

@Module({
  imports: [SequelizeModule.forFeature([Group, OneLevel])],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
