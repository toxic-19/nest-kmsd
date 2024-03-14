import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { KnowledgeBaseService } from './knowledge-base.service'
import { UpdateIsTopDto } from './dto/update-kb.dto'
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
}
