/**
 * dto:数据传输对象 数据检验
 * 不要相信前端传递过来的所有参数
 */
import { User } from '../interfaces/user.interface';
export class creatUserDto implements User {
  name: string;
  age: number;
  id: number;
}
