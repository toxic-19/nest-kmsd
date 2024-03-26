import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleService } from '../article/article.service'
import { Tag } from './model/tag.model'

@Injectable()
export class TagService {
  constructor(private readonly articleService: ArticleService, @InjectModel(Tag) private tagModel: typeof Tag) {}
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
}
