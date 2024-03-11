/**
 * Nest提供了通过 @SetMetadata() 装饰器将定制元数据附加到路由处理程序的能力。
 * 但是不要直接在路由上使用 @SetMetadata() 而是创造自己的装饰器
 */
import { SetMetadata } from '@nestjs/common'

export const Role = (...args: string[]) => SetMetadata('role', args)
