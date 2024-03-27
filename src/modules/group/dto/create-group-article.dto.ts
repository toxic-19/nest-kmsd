import { IsNotEmpty } from 'class-validator'

export class CreateGroupArticleDto {
  @IsNotEmpty({ message: '文档Id不能为空' })
  articleId: number
  @IsNotEmpty({ message: '分组id不能为空' })
  groupId: number
}
