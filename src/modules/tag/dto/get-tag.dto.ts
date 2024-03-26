import { IsNotEmpty } from 'class-validator'

export class GetTagNameDto {
  @IsNotEmpty({ message: '文章Id不能为空' })
  articleId: number
}
