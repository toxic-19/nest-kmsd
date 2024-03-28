import { Injectable } from '@nestjs/common'
import { Group } from './model/group.model'
import { InjectModel } from '@nestjs/sequelize'
import { GetGroupIdDto } from './dto/get-group.dto'
import { OneLevel } from './model/one-level.model'
import { LabelValue } from './constant'
import { ArticleService } from '../article/article.service'
import { GroupArticle } from './model/group-article.model'
import { CreateGroupArticleDto, CreateKnowArticleDto } from './dto/create-group-article.dto'
@Injectable()
export class GroupService {
  constructor(
    private readonly articleService: ArticleService,
    @InjectModel(Group) private groupModel: typeof Group,
    @InjectModel(OneLevel) private oneLevelModel: typeof OneLevel,
    @InjectModel(GroupArticle) private groupArticleModel: typeof GroupArticle,
  ) {}
  // GET: 获取知识库下分组和文章信息
  async getGroupListByKnowId(knowIdQuery: GetGroupIdDto) {
    const obj = { article: [], group: [] }
    const list = await this.getOneLevelList(knowIdQuery.knowId)
    for (const key of Object.keys(list)) {
      if (key === 'article') {
        obj[key] = await this.articleService.getArticleNameByIds(list[key])
      } else {
        obj[key] = await this.getGroupByIds(list[key])
      }
    }
    for (let item of obj.group) {
      const articleList = await this.getArticleIdsByGroupId(item.groupId)
      item.childrenData = articleList
    }
    return obj
  }
  // 获取在知识库下的所有分组和文章id
  async getOneLevelList(knowId: number) {
    const getAllRes = await this.oneLevelModel.findAll({
      attributes: ['knowId', 'label', 'childId'],
      where: {
        knowId,
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
  // 通过分组id获取分组名称
  async getGroupByIds(ids: number[]) {
    // 在这里编写异步代码
    const result = await this.groupModel.findAll({
      attributes: [['id', 'groupId'], 'groupName', 'sortNum'], // 字段重命名
      where: {
        id: ids,
      },
    })
    return result.map((item) => item.dataValues)
  }
  // 通过分组id来获取到其下的所有文章
  async getArticleIdsByGroupId(groupId: number) {
    const resultList = (
      await this.groupArticleModel.findAll({
        attributes: ['groupId', 'articleId'],
        where: {
          groupId,
        },
      })
    ).map((item) => item.dataValues.articleId)
    const list = []
    for (const key of resultList) {
      const res = await this.articleService.getArticleNameByIds([Number(key)])
      list.push(...res)
    }
    return list
  }
  // method: 在分组-文章表中创建记录
  createGroupArticle(createGroupArticleDto: CreateGroupArticleDto) {
    const { groupId, articleId } = createGroupArticleDto
    return this.groupArticleModel.create({
      groupId,
      articleId,
    })
  }
  createKnowArticle(createKnowArticleDto: CreateKnowArticleDto) {
    return this.oneLevelModel.create({
      ...createKnowArticleDto,
    })
  }
}
