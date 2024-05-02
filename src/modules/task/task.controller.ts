import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { DeleteTaskDto, GetAllTaskByProjectDto, GetTaskByProcessDto } from './dto/get-task.dto'
import { RespMap } from '~/common/interceptor/respMap'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get()
  findAll(@Query() queryByProcessName: GetTaskByProcessDto) {
    return this.taskService.findByProcessAndID(queryByProcessName)
  }

  @Post('update')
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto)
  }

  @Post('getByProjectId')
  findByProjectId(@Query() query: GetAllTaskByProjectDto) {
    return this.taskService.findByProjectId(query)
  }

  @Get('statistics')
  findAllTasks(@Query() query: GetAllTaskByProjectDto) {
    return this.taskService.findAllTasksCounts(query.projectId)
  }

  @Post('delete')
  async deleteTaskById(@Query() query: DeleteTaskDto) {
    const res = await this.taskService.deleteTaskById(query.taskId)
    if (res[0] !== 1) return RespMap.get('delError')
    return true
  }
}
