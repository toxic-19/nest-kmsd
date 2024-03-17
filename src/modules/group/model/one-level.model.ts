import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table
export class OneLevel extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column({ type: DataType.INTEGER })
  knowId: number
  @Column({ type: DataType.INTEGER, comment: '指的是groupId或者articleId，取决于label' })
  childId: number
  @Column({ type: DataType.INTEGER, comment: '1是指groupId 2是指articleId' })
  label: number
}
