import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join, extname } from 'path'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 图片存放路径
        destination: join(__dirname, '../../../images'), // 与dist同级
        // 图片文件名
        filename: (_, file, callback) => {
          const fileName = `${new Date().getTime() + extname(file.originalname)}` // 使用时间戳配合文件名生成唯一的文件名
          return callback(null, fileName)
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
