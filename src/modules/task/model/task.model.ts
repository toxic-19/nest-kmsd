import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class Task extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    comment: '自增id',
  })
  id: number
  @Column({
    type: DataType.STRING,
    comment: '任务名称',
  })
  taskName: string
  @Column({
    type: DataType.INTEGER,
    comment: '任务状态',
  })
  taskStatus: number
  @Column({
    type: DataType.INTEGER,
    comment: '任务人日',
  })
  days: number
  @Column({
    type: DataType.DATE,
    comment: '任务预计开始时间',
  })
  dateStart: Date
  @Column({
    type: DataType.DATE,
    comment: '任务预计结束时间',
  })
  dateEnd: Date
  @Column({
    type: DataType.STRING,
    comment: '流程名称',
  })
  processName: string
  @Column({
    type: DataType.INTEGER,
    comment: '外键，项目id',
  })
  projectId: number
  @Column({
    type: DataType.INTEGER,
    comment: '是否删除 0为false 1为true 默认为0',
  })
  isDel: boolean
}
