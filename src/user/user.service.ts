/**
 * 快捷键：nest g s user 即可快速创建一个 Service文件 并在user文件夹的下面
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(query) {
    return query;
  }
  getUserById(userId) {
    return `This user's id is ${userId}`;
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
