/**
 * Sequelize采用活动记录(Active Record)模式，在这一模式下，你可以使用模型类直接和数据库交互。
 * 定义该User模型可以和数据库表连接
 * equelize 默认将模型名称转换为小写并使用复数形式作为表名，例如 User 模型对应的表名为 users。
 */
import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class User extends Model<User> {
  // @Column({ primaryKey: true })
  // id: string;

  @Column
  name: string

  @Column({ defaultValue: true })
  isActive: boolean
}
