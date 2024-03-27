import { Model, Table, DataType, Column } from 'sequelize-typescript'
@Table
export class Article extends Model<Article> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  title: string
  @Column
  description: string
  @Column
  publishedTime: Date
  @Column
  content: string
  @Column
  author: string
  @Column
  preview: string
}
