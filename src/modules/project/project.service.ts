import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { HangupProjectQuery, UpdateProjectName } from './dto/update-project.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Project } from './model/project.model'
import { HangUP, TEMPLATE_MAP } from '~/modules/project/constant/template'
import { getProjectDto } from '~/modules/project/dto/get-project.dto'
import { Op } from 'sequelize'

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}
  // POST 新建项目
  async create(createProjectDto: CreateProjectDto) {
    const { projectName, processTemplate } = createProjectDto
    if (projectName && processTemplate) {
      const dataValues = (
        await this.projectModel.create({
          ...createProjectDto,
        })
      ).dataValues
      return {
        ...dataValues,
        process: TEMPLATE_MAP.get(dataValues.processTemplate),
      }
    }
    return {
      httpStatus: '0',
      responseMessage: '缺少参数projectName或者流程模板',
      success: false,
    }
  }
  // GET 获取列表
  async findAll(query: getProjectDto) {
    const { isHangUp, projectName } = query
    return (
      await this.projectModel.findAll({
        where: {
          isHangUp: HangUP[isHangUp],
          projectName: {
            [Op.like]: `%${projectName}%`,
          },
        },
      })
    ).map((item) => {
      return { ...item.dataValues, process: TEMPLATE_MAP.get(item.dataValues.processTemplate) }
    })
  }

  // POST 重命名
  update(updateProjectName: UpdateProjectName) {
    const { id, projectName } = updateProjectName
    return this.projectModel.update(
      {
        projectName,
      },
      {
        where: {
          id,
        },
      },
    )
  }

  hangUpProject(query: HangupProjectQuery) {
    const { id, isHangUp } = query
    return this.projectModel.update(
      {
        isHangUp,
      },
      {
        where: {
          id,
        },
      },
    )
  }
}
