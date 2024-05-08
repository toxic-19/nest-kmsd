import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { KnowledgeBaseService } from './knowledge-base.service'
import { GetKnowInfoDto, UpdateIsTopDto } from './dto/update-kb.dto'
import { CreateKbDto, UpdateKbDto } from './dto/create-kb.dto'
import { query } from 'express'
@Controller('knowledge-base')
@ApiTags('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly kbService: KnowledgeBaseService) {}
  @Get('')
  getKnowledgeBaseList() {
    return this.kbService.getKnowledgeBaseList()
  }
  @Post('/changeTop')
  changeTop(@Body() updateIsTopDto: UpdateIsTopDto) {
    return this.kbService.cancelTop(updateIsTopDto)
  }
  @Post('create') // 在新建知识库的时候，需要自动创建一个文章 默认的文章模板
  addKnowBase(@Body() createKbDto: CreateKbDto) {
    return this.kbService.createNewBase(createKbDto)
  }
  @Get('byKnowId')
  getKnowInfoById(@Query() query: GetKnowInfoDto) {
    console.log(query, 'query====================')
    return this.kbService.getKnowInfoById(+query.knowId)
  }
  @Post('/update')
  updateKnowBase(@Body() createKbDto: UpdateKbDto) {
    return this.kbService.updateKnowBase(createKbDto)
  }
}
