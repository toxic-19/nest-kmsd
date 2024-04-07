import { IsIn, IsNotEmpty } from 'class-validator'

export class getProjectDto {
  @IsNotEmpty({ message: '传递查询的项目名称' })
  projectName?: string
  @IsNotEmpty({ message: '请传递是否挂起标识' })
  @IsIn(['isIng', 'hangUp'])
  isHangUp: string
}
