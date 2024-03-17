import { Column, DataType, Model, Table } from 'sequelize-typescript'
@Table
export class Group extends Model<Group> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  sortNum: number
  @Column
  groupName: string
}
