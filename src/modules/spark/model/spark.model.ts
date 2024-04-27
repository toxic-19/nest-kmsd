import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { IsIn } from 'class-validator'
// 聊天会话
@Table
export class Session extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column({ comment: '会话名称' })
  sessionName: string
  @Column({ comment: '是否删除 true 1 标识删除  false 0' })
  isDel: boolean
}
// 会话中的历史记录
@Table
export class History extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column({ comment: '会话id' })
  sessionId: string
  @Column({ comment: '记录内容' })
  content: string
  @Column({ comment: '记录所属角色' })
  @IsIn(['user', 'assistant'])
  role: string
}
@Table
export class UploadFile extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column({ type: DataType.STRING, comment: '用于问题定位ID' })
  sid: string
  @Column({ type: DataType.STRING, comment: '上传的文件id' })
  fileId: string
}
