import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetGroupIdDto } from './dto/get-group.dto'
import { GroupService } from './group.service'

@Controller('group')
@ApiTags('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Get('')
  getGroupListByKnowId(@Query() query: GetGroupIdDto) {
    console.log(query)
    return this.groupService.getGroupListByKnowId(query)
  }
}
