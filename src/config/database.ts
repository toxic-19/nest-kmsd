import { SequelizeModuleOptions } from '@nestjs/sequelize'
// const { DATABASE_PORT, DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } = process.env
export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql', // 数据库类型
  host: 'localhost', // 本地
  port: 3306, // 端口
  username: 'root',
  password: '123456',
  database: 'order',
  synchronize: true,
  autoLoadModels: true, // 如果设置为true，将在项目启动时将模型定义同步数据库
  timezone: '+08:00', // 设置时区
}
