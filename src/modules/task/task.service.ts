import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Task } from './model/task.model'
import { GetTaskByProcessDto } from './dto/get-task.dto'

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskService: typeof Task) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskService.create({
      ...createTaskDto,
    })
  }

  findByProcessAndID(queryByProcessName: GetTaskByProcessDto) {
    const { projectId, processName } = queryByProcessName
    if (projectId && processName) {
      return this.taskService.findAll({
        where: {
          projectId,
          processName,
        },
      })
    }
    return {
      httpStatus: '0',
      responseMessage: '缺少参数',
      success: false,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`
  }

  update(updateTaskDto: UpdateTaskDto) {
    const { id, ...args } = updateTaskDto
    return this.taskService.update(args, {
      where: {
        id,
      },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
