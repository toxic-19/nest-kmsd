import { Controller, Get, Post, Body, Res } from '@nestjs/common'
import { SparkService } from './spark.service'
import { ChatSparkDto } from './dto/create-spark.dto'
@Controller('spark')
export class SparkController {
  constructor(private readonly sparkService: SparkService) {}

  @Post('/chat')
  async chat(@Body() chatSparkDto: ChatSparkDto, @Res() res) {
    return this.sparkService.chatWithSpark(chatSparkDto, res)
  }

  @Get()
  async getWebsocketUrl() {
    return this.sparkService.getWebsocketUrl()
  }
}
