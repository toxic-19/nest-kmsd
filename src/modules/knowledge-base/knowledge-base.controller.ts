import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger'
import { KnowledgeBaseService } from './knowledge-base.service'
import { UpdateIsTopDto } from './dto/update-kb.dto'
import { CreateKbDto } from './dto/create-kb.dto'
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
}
