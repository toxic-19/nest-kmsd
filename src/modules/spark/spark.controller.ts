import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { SparkService } from './spark.service'
import { CreateSessionDto, SaveHistoryDto } from './dto/create-spark.dto'
import { DeleteSessionDto, ReNameDto } from './dto/update-spark.dto'
import { GetHistoryDto, GetSavedFileDto } from './dto/get-spark.dto'
import { ArticleService } from '../article/article.service'
@Controller('spark')
export class SparkController {
  constructor(private readonly sparkService: SparkService, private readonly articleService: ArticleService) {}

  @Get('/session/list')
  async getWebsocketUrl() {
    return this.sparkService.getSession()
  }
  @Post('/session/add')
  addSession(@Body() body: CreateSessionDto) {
    return this.sparkService.createSession(body)
  }
  @Post('/session/reName')
  reNameSession(@Body() body: ReNameDto) {
    return this.sparkService.reNameSession(body)
  }
  @Post('/session/delete')
  deleteSession(@Query() query: DeleteSessionDto) {
    return this.sparkService.deleteSession(query)
  }
  // 保存当次聊天的对话记录
  @Post('/history/save')
  saveHistory(@Body() body: SaveHistoryDto) {
    return this.sparkService.saveHistory(body)
  }
  @Get('/history/list')
  getHistory(@Query() query: GetHistoryDto) {
    return this.sparkService.getHistoriesBySessionId(query)
  }

  @Get('/file/fileId')
  async getFileIdByArticleId(@Query() query: { articleId: number }) {
    return this.sparkService.getFileIdByArticleId(query.articleId)
  }
  @Post('/file/save')
  async saveMdFile(@Body() query: GetSavedFileDto) {
    const { articleId, needSummary } = query
    const data = await this.articleService.getArticleById(articleId)
    if (data !== null) {
      const { content, title } = data.dataValues
      return this.sparkService.changeToMdFile({ content, title, articleId, needSummary })
    }
  }
  @Post('/file/summary')
  getSummaryByFileId(@Query() query: { fileId: string; restart: boolean }) {
    return this.sparkService.getfileSummary(query.fileId, query.restart)
  }
}
