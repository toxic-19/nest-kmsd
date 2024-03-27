export class CreateArticleDto {
  knowId: number // 必须在知识库id下
  groupId?: number // 不一定需要分组id
  title: string
  description: string
  content?: string
  preview?: string
}
