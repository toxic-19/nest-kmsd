import { forwardRef, Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { InjectModel } from '@nestjs/sequelize'
import { GroupService } from '../group/group.service'
import { AddTagDto, CreateArticleDto, RemoveTagDto } from './dto/create-article.dto'
import { Article } from './model/article.model'
import { ArticleTag } from './model/articleTag.model'
import { TagService } from '~/modules/tag/tag.service'
import { DelType } from '~/modules/article/constant'
import { RespMap } from '~/common/interceptor/respMap'

@Injectable()
export class ArticleService {
  constructor(
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,
    @InjectModel(Article) private articleModel: typeof Article,
    @InjectModel(ArticleTag) private articleTagModel: typeof ArticleTag,
  ) {}
  getArticleList() {
    return this.articleModel.findAll({
      where: {
        isDel: DelType['notDel'],
      },
    })
  }
  getArticleById(articleId: number) {
    console.log('article============', articleId)
    return this.articleModel.findOne({ where: { id: articleId, isDel: DelType['notDel'] } })
  }
  async getArticleNameByIds(ids: number[]) {
    const result = await this.articleModel.findAll({
      attributes: [['id', 'articleId'], 'title', 'description'], // 字段重命名
      where: {
        id: ids,
        isDel: DelType['notDel'],
      },
    })
    return result.map((item) => item.dataValues)
  }
  async getArticleByTagId(query: { tagId: number }) {
    const articleIdsList = (
      await this.articleTagModel.findAll({
        attributes: ['articleId'],
        where: {
          tagId: query.tagId,
        },
      })
    ).map((doc) => doc.dataValues.articleId)
    return this.articleModel.findAll({
      attributes: ['id', 'title', 'description', 'content', 'createdAt', 'updatedAt'],
      where: {
        id: articleIdsList,
        isDel: DelType['notDel'],
      },
    })
  }

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
    const { knowId, groupId, tags, ...article } = createArticleDto
    const tagIds = await this.tagService.getIdsByTagNames(tags)
    const articleId = (await this.articleModel.create(article)).dataValues.id
    // 在articleTagModel中创建 tagId - articleId 的记录
    const records = tagIds.map((tagId) => ({ tagId, articleId }))
    await this.articleTagModel.bulkCreate(records) // 批量添加记录
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

  // post: 编辑文章
  // 1. 重命名
  // 2. 编辑内容
  async updateArticleById(articleId, dto) {
    const { title, content } = dto
    return this.articleModel.update({ title, content }, { where: { id: articleId } })
  }
  // 删除文章 - 修改isDel
  async updateIsDel(articleId: number) {
    const res = await this.articleModel.update(
      { isDel: DelType['deleted'] },
      {
        where: {
          id: articleId,
        },
      },
    )
    return res[0] === 1 ? articleId : []
  }

  // 删除文档上标签
  deleteTagForArticle(body: RemoveTagDto) {
    const { tagId, articleId } = body
    return this.articleTagModel.destroy({
      where: {
        tagId,
        articleId,
      },
    })
  }

  async addTagForArticle(body: AddTagDto) {
    const { tagName, articleId } = body
    const { id } = await this.tagService.addTag(tagName)
    const res = await this.articleTagModel.findOne({
      where: {
        tagId: id,
        articleId,
      },
    })
    console.log('res', res, res === null)
    if (res === null) {
      return this.articleTagModel.create({
        tagId: id,
        articleId,
      })
    } else return RespMap.get('tagHasExisted')
  }
}
