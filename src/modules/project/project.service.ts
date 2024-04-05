import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "./model/project.model";
import { TEMPLATE_MAP } from "~/modules/project/constant/template";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}
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

  async findAll() {
    return (await this.projectModel.findAll()).map((item) => {
      return { ...item.dataValues, process: TEMPLATE_MAP.get(item.dataValues.processTemplate) }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} project`
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`
  }

  remove(id: number) {
    return `This action removes a #${id} project`
  }
}
