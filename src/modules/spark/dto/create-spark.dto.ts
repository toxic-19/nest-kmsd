export class CreateSessionDto {
  sessionName: string
}
export class SaveHistoryDto {
  sessionId?: number // 所属会话id  sessionId和articleId二选一
  articleId?: number // 所属文档id
  userInput: string // 用户输入
  assistantResponse: string // AI输出
}
