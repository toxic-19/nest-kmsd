import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Task } from './model/task.model'
import { GetAllTaskByProjectDto, GetTaskByProcessDto } from './dto/get-task.dto'
import { RespMap } from '~/common/interceptor/respMap'
import { Op } from 'sequelize'

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create({
      ...createTaskDto,
    })
  }

  async findByProcessAndID(queryByProcessName: GetTaskByProcessDto) {
    const { projectId, processName } = queryByProcessName
    if (projectId && processName) {
      const taskLists = (
        await this.taskModel.findAll({
          where: {
            projectId,
            processName,
            isDel: false,
          },
        })
      ).map((item) => item.dataValues)
      taskLists.forEach((task) => {
        task.dateStart = new Date(task.dateStart).toLocaleString('zh-cn', { timeZone: 'Asia/Shanghai' }).replace(/\//g, '-')
        task.dateEnd = new Date(task.dateEnd).toLocaleString('zh-cn', { timeZone: 'Asia/Shanghai' }).replace(/\//g, '-')
      })
      return taskLists
    }
    return {
      httpStatus: '0',
      responseMessage: '缺少参数',
      success: false,
    }
  }

  update(updateTaskDto: UpdateTaskDto) {
    const { id, ...args } = updateTaskDto
    return this.taskModel.update(args, {
      where: {
        id,
      },
    })
  }

  async findByProjectId(query: GetAllTaskByProjectDto) {
    const { projectId } = query
    if (projectId) {
      const list = (
        await this.taskModel.findAll({
          where: {
            projectId,
            isDel: false,
          },
        })
      ).map(({ dataValues }) => {
        dataValues.dateStart = new Date(dataValues.dateStart).getTime() / 1000
        dataValues.dateEnd = new Date(dataValues.dateEnd).getTime() / 1000
        return dataValues
      })
      return list.reduce((acc, cur) => {
        const lastGroup = acc[acc.length - 1]
        if (lastGroup && lastGroup.processName === cur.processName) {
          lastGroup.taskLists.push(cur)
        } else {
          acc.push({ title: cur.processName, projectId: cur.projectId, taskLists: [cur] })
        }
        return acc
      }, [])
    }
    return RespMap.get('noArgs')
  }

  async findAllTasksCounts(projectId: number) {
    const unfinished = await this.findDiffStatusCount(projectId, 0, 1, 2, 6)
    const delayCancel = await this.findDiffStatusCount(projectId, 4, 5)
    const completed = await this.findDiffStatusCount(projectId, 3)
    const total = await this.taskModel.count({
      where: {
        projectId,
        isDel: false,
      },
    })
    return { total, unfinished, delayCancel, completed }
  }
  findDiffStatusCount(projectId: number, ...array: number[]) {
    return this.taskModel.count({
      where: {
        projectId,
        taskStatus: {
          [Op.in]: array,
        },
        isDel: false,
      },
    })
  }

  deleteTaskById(taskId: number) {
    return this.taskModel.update(
      {
        isDel: true,
      },
      {
        where: {
          id: taskId,
        },
      },
    )
  }
}
