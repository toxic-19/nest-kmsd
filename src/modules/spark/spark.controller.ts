import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { SparkService } from './spark.service'
import { CreateSessionDto } from './dto/create-spark.dto'
import { DeleteSessionDto, ReNameDto } from '~/modules/spark/dto/update-spark.dto'
@Controller('spark')
export class SparkController {
  constructor(private readonly sparkService: SparkService) {}

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
}
