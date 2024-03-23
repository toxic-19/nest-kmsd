import { Table, Model, Column, DataType, ForeignKey, HasMany } from 'sequelize-typescript'

@Table
export class GroupArticle extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number

  @Column
  groupId: number

  @Column
  articleId: number
}
