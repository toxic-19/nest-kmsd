import { forwardRef, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleService } from '../article/article.service'
import { Tag } from './model/tag.model'
import { Inject } from '@nestjs/common/decorators'
import { RespMap } from '~/common/interceptor/respMap'

@Injectable()
export class TagService {
  constructor(
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    @InjectModel(Tag) private tagModel: typeof Tag,
  ) {}
  getAllTags() {
    return this.tagModel.findAll()
  }
  // GET: 通过文章id获取该文章的所有标签
  async getTagsNameByIds(articleId: number) {
    const tagIds = await this.articleService.getTagIdsByArticleId(articleId)
    return this.tagModel.findAll({
      attributes: [['id', 'tagId'], 'tagName'],
      where: {
        id: tagIds,
      },
    })
  }
  // method: 通过标签title获取id
  async getIdsByTagNames(tagNames: Array<string>) {
    return (
      await this.tagModel.findAll({
        attributes: ['id'],
        where: {
          tagName: tagNames,
        },
      })
    ).map((item) => item.id)
  }
  // method: 新增文章的时候，如果该标签没有在数据库中，需要新增该标签
  async addTag(tagName: string) {
    const res = await this.tagModel.findOne({
      where: { tagName },
    })
    console.log(res)
    if (res === null) {
      return this.tagModel.create({
        tagName,
      })
    } else {
      return {
        msg: '该标签已存在',
        ...res.dataValues,
      }
    }
  }
}
