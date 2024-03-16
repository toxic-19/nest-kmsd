import { IsNotEmpty, IsIn } from 'class-validator'
export class CreateKbDto {
  @IsNotEmpty({ message: '知识库名称不能为空' })
  kbName: string
  @IsNotEmpty({ message: '知识库描述不能为空' })
  kbDesc: string
  // 在置顶知识库中新建
  @IsIn([true, false], {
    message: '请传递正确的isTop值，如true或者false',
  })
  isTop: boolean
}
