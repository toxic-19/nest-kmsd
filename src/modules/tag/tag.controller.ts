import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetTagNameDto } from './dto/get-tag.dto'
import { TagService } from './tag.service'

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('')
  getAllTags() {
    return this.tagService.getAllTags()
  }
  @Get('getName')
  getTagNameById(@Query() query: GetTagNameDto) {
    return this.tagService.getTagsNameByIds(+query.articleId)
  }
  @Get('get')
  getTag() {
    return this.tagService.getIdsByTagNames(['英文', '语文'])
  }
}
