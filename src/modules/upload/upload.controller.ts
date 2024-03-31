import { Controller, Get, Post, Param, UseInterceptors, UploadedFile } from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file')) // file为前端表单字段名称
  async uploadFile(@UploadedFile() file) {
    console.log('file', file)
    return `http://localhost:3001/doc/${file.filename}`
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id)
  }
}
