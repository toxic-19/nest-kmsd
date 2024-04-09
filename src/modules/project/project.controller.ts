import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { HangupProjectQuery, UpdateProjectName } from './dto/update-project.dto'
import { getProjectDto } from './dto/get-project.dto'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto)
  }

  @Get()
  findAll(@Query() query: getProjectDto) {
    return this.projectService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id)
  }

  @Post('/updateName')
  update(@Query() updateProjectName: UpdateProjectName) {
    return this.projectService.update(updateProjectName)
  }

  // 项目挂起
  @Post('/hangup')
  remove(@Query() query: HangupProjectQuery) {
    return this.projectService.hangUpProject(query)
  }
}
