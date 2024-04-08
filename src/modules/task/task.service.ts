import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "./model/task.model";
import { GetAllTaskByProjectDto, GetTaskByProcessDto } from "./dto/get-task.dto";
import { RespMap } from "~/common/interceptor/respMap";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create({
      ...createTaskDto,
    })
  }

  findByProcessAndID(queryByProcessName: GetTaskByProcessDto) {
    const { projectId, processName } = queryByProcessName
    if (projectId && processName) {
      return this.taskModel.findAll({
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
          },
        })
      ).map(({ dataValues }) => {
        dataValues.dateStart = new Date(dataValues.dateStart).getTime() / 1000
        dataValues.dateEnd = new Date(dataValues.dateEnd).getTime() / 1000
        return dataValues
      })
      return list.reduce((acc, cur) => {
        const lastGroup = acc[acc.length - 1]
        console.log(lastGroup)
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
}
