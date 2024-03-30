import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  findOne(id: number) {
    return `This action returns a #${id} upload`
  }
}
