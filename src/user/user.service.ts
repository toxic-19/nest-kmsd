/**
 * 快捷键：nest g s user 即可快速创建一个 Service文件 并在user文件夹的下面
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {} // 使用@InjectModel来将UserModel注入到service内
  getUser(query) {
    return query;
  }
  getUserById(userId) {
    return `This user's id is ${userId}`;
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  deleteUserById(userId) {
    return {
      id: userId,
      msg: 'delete',
    };
  }
  updateUserById(userId, dto) {
    return {
      id: userId,
      ...dto,
      msg: 'put success',
    };
  }
  addUser(creatUserDto) {
    return {
      ...creatUserDto,
      msg: 'add success',
    };
  }
}
