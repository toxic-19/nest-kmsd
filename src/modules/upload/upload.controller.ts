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
    const temp = []
    temp.push({ name: file.originalname, url: `http://localhost:3001/doc/${file.filename}` })
    return temp
  }
}
