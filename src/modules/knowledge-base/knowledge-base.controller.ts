import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { KnowledgeBaseService } from './knowledge-base.service'

@Controller('knowledge-base')
@ApiTags('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly kbService: KnowledgeBaseService) {}
  @Get('')
  getKnowledgeBaseList() {
    return this.kbService.getKnowledgeBaseList()
  }
}
