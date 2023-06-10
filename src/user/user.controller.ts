/**
 * 快捷键：nest g co user 即可快速创建一个Controller文件
 * 此文件单单是单机游戏，没有连接数据库
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { creatUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // 依赖注入
  @Get('')
  getUser(@Query() query: Record<string, any>) {
    // Record是指的是键值对 @Query是装饰器 即注解 是放在路径之后的 ?
    // http://localhost:3001/user?name=jack&age=10
    return this.userService.getUser(query);
  }
  @Get(':id')
  getUserById(@Param('id') userId: number) {
    // param里面传递的id尽管声明了是number 但是路径上默认是string类型的
    // http://localhost:3001/user/19 直接放在路径/后面
    return this.userService.getUserById(userId);
  }
  @Get('param/:id') // 避免路径重复加上param
  getUserByParam(@Param() param: { id: number }) {
    // 没有参数的param 需要从param解构出来传递的参数 param的userId是由参数里面的类型限制 { userId: number }声明的
    // http://localhost:3001/user/param/10
    console.log(param);
    return 'params' + this.userService.getUserById(param.id);
  }
  @Get('get/list')
  findAllUser(): User[] {
    console.log('ing...findAllUser');
    console.log(this.userService.findAll());
    return this.userService.findAll();
  }
  @Delete(':id')
  deleteUserById(@Param('id') userId: number) {
    // 同样都是使用param参数 和上面的get一致
    // http://localhost:3001/user/10
    return this.userService.deleteUserById(userId);
  }
  @Put(':id')
  updateUserById(
    @Param('id') userId: number,
    @Body() body: Record<string, any>,
  ) {
    // put接口是通过id查询到该记录，再传递要修改的内容
    // http://localhost:3001/user/10  { "name": "put-name",  "age": 10 }
    return this.userService.updateUserById(userId, body);
  }
  @Post()
  addUser(@Body() userDto: creatUserDto) {
    // http://localhost:3001/user { "name": "post-name",  "age": 10 }
    return this.userService.addUser(userDto);
  }
  @Get('get/error')
  error() {
    // http://localhost:3001/user/get/error
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
