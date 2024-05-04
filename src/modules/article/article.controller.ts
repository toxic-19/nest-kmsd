import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'
import { AddTagDto, CreateArticleDto, RemoveTagDto } from './dto/create-article.dto'

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('')
  getArticleList() {
    return this.articleService.getArticleList()
  }
  // 通过articleId获取文章的具体内容
  @Get('getContent')
  getArticleContentById(@Query() query: { articleId: number }) {
    return this.articleService.getArticleById(query.articleId)
  }
  // 获取标签下的所有文章
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

  @Post('deleteArticle')
  deleteArticle(@Query() query: { articleId: number }) {
    return this.articleService.updateIsDel(query.articleId)
  }

  @Post('removeTag')
  deleteTagForArticle(@Body() body: RemoveTagDto) {
    return this.articleService.deleteTagForArticle(body)
  }

  @Post('addTag')
  addTagForArticle(@Body() body: AddTagDto) {
    return this.articleService.addTagForArticle(body)
  }
}
