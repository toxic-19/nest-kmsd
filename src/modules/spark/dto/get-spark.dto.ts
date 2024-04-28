export class GetHistoryDto {
  sessionId: number
  pageSize: number
  page: number
}
export class GetSavedFileDto {
  // content: string
  articleId: number
  needSummary: boolean // 是否需要调用文档总结接口
  content?: string
  title?: string
}
