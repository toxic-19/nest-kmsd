import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('')
  getArticleList() {
    return this.articleService.getArticleList()
  }
  // 通过articleId获取文章的具体内容
  @Get('articleId/:id')
  getArticleContentById(@Param() params: { id: number }) {
    return this.articleService.getArticleById(params)
  }
}
