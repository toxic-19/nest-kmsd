import { forwardRef, Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { InjectModel } from '@nestjs/sequelize'
import { GroupService } from '../group/group.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { Article } from './model/article.model'
import { ArticleTag } from './model/articleTag.model'

@Injectable()
export class ArticleService {
  constructor(
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    @InjectModel(Article) private articleModel: typeof Article,
    @InjectModel(ArticleTag) private articleTagModel: typeof ArticleTag,
  ) {}
  getArticleList() {
    return this.articleModel.findAll()
  }
  getArticleById(articleId: number) {
    return this.articleModel.findOne({ where: { id: articleId } })
  }
  async getArticleNameByIds(ids: number[]) {
    const result = await this.articleModel.findAll({
      attributes: [['id', 'articleId'], 'title', 'description'], // 字段重命名
      where: {
        id: ids,
      },
    })
    return result.map((item) => item.dataValues)
  }
  async getArticleByTagId(query: { tagId: number }) {}

  // method: 在文章-标签表中获取到articleId中的所有标签id
  async getTagIdsByArticleId(articleId: number) {
    const tagIds = (
      await this.articleTagModel.findAll({
        attributes: ['tagId'],
        where: {
          articleId,
        },
      })
    ).map((item) => item.dataValues.tagId)
    return tagIds
  }

  // post: 创建文章
  // 1. 模板 - knowId
  // 2. 同级文章 - knowId
  // 3. 分组下文章 - knowId groupId
  async createArticle(createArticleDto: CreateArticleDto) {
    // 1. 在article表中创建
    // 2. 如果是在已有分组下 在group-article中创建
    // 3. 如果只是在知识库下 在one-level中创建  label=2 childId=新建的articleId
    const { knowId, groupId, ...artile } = createArticleDto
    const articleId = (await this.articleModel.create(artile)).dataValues.id
    if (groupId && articleId) {
      return this.groupService.createGroupArticle({
        articleId,
        groupId,
      })
    }
    const articleLabel = 1
    if (knowId && !groupId && articleId) {
      return this.groupService.createKnowArticle({
        knowId,
        childId: articleId,
        label: articleLabel,
      })
    }
  }
}
