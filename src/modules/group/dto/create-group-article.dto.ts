import { IsNotEmpty } from 'class-validator'

export class CreateGroupArticleDto {
  @IsNotEmpty({ message: '文档Id不能为空' })
  articleId: number
  @IsNotEmpty({ message: '分组id不能为空' })
  groupId: number
}

export class CreateKnowArticleDto {
  @IsNotEmpty({ message: '知识库Id不能为空' })
  knowId: number
  @IsNotEmpty({ message: '文档Id不能为空' })
  childId: number
  //  1 是文档 2 是知识库
  label: number
}
