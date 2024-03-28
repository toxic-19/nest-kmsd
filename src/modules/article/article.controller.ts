import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('')
  getArticleList() {
    return this.articleService.getArticleList()
  }
  // 通过articleId获取文章的具体内容
  @Get('getContent') // TODO 这个路径得改
  getArticleContentById(@Query() query: { articleId: number }) {
    return this.articleService.getArticleById(query.articleId)
  }
  @Get('getByTagId')
  getArticleByTagId(@Query() query) {
    return this.articleService.getArticleByTagId(query)
  }

  // 创建文章
  @Post('createDoc')
  postCreateArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto)
  }

  // 编辑文章
  @Post('updateDoc/:id')
  postUpdateArticle(@Param('id') articleId: number, @Body() body: Record<string, any>) {
    return this.articleService.updateArticleById(articleId, body)
  }
}
