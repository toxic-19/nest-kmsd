// 定义模型KBase知识库模型
import { Column, Table, Model, DataType } from 'sequelize-typescript'
@Table
export class KnowLedge extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  isPublic: number
  @Column
  kbName: string
  @Column
  kbDesc: string
  @Column
  isTop: boolean
  @Column
  cover: string
  @Column
  creatorId: number
  @Column
  seqNum: number
  @Column
  isCollected: boolean
  @Column
  isMine: boolean
}
