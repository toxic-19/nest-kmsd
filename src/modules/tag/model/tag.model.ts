import { Model, Table, DataType, Column } from 'sequelize-typescript'
@Table({
  timestamps: false,
})
export class Tag extends Model<Tag> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  tagName: string
}
