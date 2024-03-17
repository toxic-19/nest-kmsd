import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { GetGroupIdDto } from './dto/get-group.dto'
import { Group } from './model/group.model'
import { OneLevel } from './model/one-level.model'
import { LabelValue } from './constant'
@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupModel: typeof Group, @InjectModel(OneLevel) private oneLevelModel: typeof OneLevel) {}
  // 获取知识库下分组和文章信息
  async getGroupListByKnowId(getQuery: GetGroupIdDto) {
    const obj = { article: [], group: [] }
    const list = await this.getOneLevelList(getQuery)
    for (const key of Object.keys(list)) {
      obj[key] = await this.getGroupByIds(list[key])
    }
    return obj
  }
  // 获取在知识库下的所有分组和文章id
  async getOneLevelList(knowIdQuery) {
    const getAllRes = await this.oneLevelModel.findAll({
      attributes: ['knowId', 'label', 'childId'],
      where: {
        ...knowIdQuery,
      },
    })
    const obj = { article: [], group: [] }
    // 处理数据
    getAllRes
      .map(({ label, childId }) => {
        return { label: LabelValue[label], childId }
      })
      .forEach((item) => {
        obj[item.label].push(item.childId)
      })
    return obj
  }

  getArticleById(id) {}

  async getGroupByIds(ids) {
    // 在这里编写异步代码
    const result = await this.groupModel.findAll({
      attributes: [['id', 'groupId'], 'groupName', 'sortNum'], // 字段重命名
      where: {
        id: ids,
      },
    })
    return result.map((item) => item.dataValues)
  }
}
