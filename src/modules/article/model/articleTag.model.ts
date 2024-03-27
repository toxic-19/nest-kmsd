import { Model, Table, DataType, Column } from 'sequelize-typescript'
@Table
export class ArticleTag extends Model<ArticleTag> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  articleId: string
  @Column
  tagId: string
}
