import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { GetTaskByProcessDto } from './dto/get-task.dto'

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id)
  }

  @Post('update')
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id)
  }
}
