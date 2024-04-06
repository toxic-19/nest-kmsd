import { Column, DataType, Model, Table } from 'sequelize-typescript'
@Table
export class Project extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  projectName: string
  @Column({ comment: '项目背景图' })
  projectCover: string
  @Column({ comment: '项目创建人' })
  author: string
  @Column({ comment: '项目流程模板，目前是前端提供的' })
  processTemplate: number
  @Column({ comment: '项目挂起，1是挂起，0是进行中默认', defaultValue: 0 })
  isHangUp: boolean
}
