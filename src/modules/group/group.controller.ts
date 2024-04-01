import { Controller, Get, Post, Query, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateGroupDto, GetGroupIdDto, UpdateGroupDto } from './dto/get-group.dto'
import { GroupService } from './group.service'

@Controller('group')
@ApiTags('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Get('')
  getGroupListByKnowId(@Query() query: GetGroupIdDto) {
    return this.groupService.getGroupListByKnowId(query)
  }
  @Post('createGroup')
  postGroupByKnowId(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createKnowGroup(createGroupDto)
  }
  @Post('updateName')
  updateGroupName(@Body() body: UpdateGroupDto) {
    this.groupService.updateGroupName(body)
  }
}
