export class CreateSessionDto {
  sessionName: string
}
export class SaveHistoryDto {
  sessionId: number // 所属会话
  userInput: string // 用户输入
  assistantResponse: string // AI输出
}
