import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Article } from './model/article.model'

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}
  getArticleList() {
    return this.articleModel.findAll()
  }
  getArticleById(params: { id: number }) {
    return this.articleModel.findOne({ where: { id: params.id } })
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
}
