import { Model, Table, DataType, Column } from 'sequelize-typescript'
@Table({
  timestamps: false,
})
export class ArticleTag extends Model<ArticleTag> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number
  @Column
  articleId: number
  @Column
  tagId: number
}
