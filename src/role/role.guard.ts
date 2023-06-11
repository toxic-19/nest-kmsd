/**
 * 守卫是一个使用 @Injectable() 装饰器的类。 守卫应该实现 CanActivate 接口。
 * 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 我们希望根据分配给当前用户的角色与正在处理的当前路由所需的实际角色之间的比较来设置返回值的条件。
    // 为了访问路由的角色(自定义元数据)，我们将使用在 @nestjs/core 中提供的 Reflector 帮助类。
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log('roles', roles); // 会输出路由上的@Role()里面的分配的角色值
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    Logger.log('RoleGuard...');
    return true;
  }
}
