/**
 * 快捷键：nest g s user 即可快速创建一个 Service文件 并在user文件夹的下面
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {} // 使用@InjectModel来将UserModel注入到service内
  getUserByPage(query) {
    const { page, pageSize, ...args } = query;
    if (page && pageSize) {
      return this.userModel.findAll({
        offset: (Number(page) - 1) * Number(pageSize), // 设置偏移量
        limit: Number(pageSize), // 设置每页数据条数
        where: {
          isActive: true,
          ...args,
        },
      });
    } else {
      return this.userModel.findAll({
        where: {
          isActive: true,
          ...args,
        },
      });
    }
  }
  getUserById(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ where: { isActive: true } });
  }
  async deleteUserById(userId) {
    return this.userModel.update(
      { isActive: false },
      { where: { id: userId } },
    );
  }
  async updateUserById(userId, dto) {
    const { name } = dto;
    return this.userModel.update(
      { name: name, updatedAt: new Date() },
      { where: { id: userId } },
    );
  }
  async addUser(creatUserDto): Promise<User> {
    const { name } = creatUserDto;
    const user = { name, isActive: true }; // 默认生成的user是可用的
    return this.userModel.create(user);
  }
}
