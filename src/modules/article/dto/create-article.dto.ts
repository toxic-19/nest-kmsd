export class CreateArticleDto {
  knowId: number // 必须在知识库id下
  groupId?: number // 不一定需要分组id
  tags?: Array<string> // 文章标签 - 数组
  title: string
  description: string
  content?: string
  preview?: string
}
