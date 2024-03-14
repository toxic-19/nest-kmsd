import { IsNotEmpty, IsIn } from 'class-validator'
export class UpdateIsTopDto {
  @IsNotEmpty({ message: '知识库id不能为空' })
  id: number
  @IsIn([true, false], {
    message: '请传递正确的isTop值，如true或者false',
  })
  isTop: boolean
}
