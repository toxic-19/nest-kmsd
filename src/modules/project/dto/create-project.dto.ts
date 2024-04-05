import { IsIn, IsNotEmpty } from 'class-validator'

export class CreateProjectDto {
  @IsNotEmpty({ message: '项目名称不能为空' })
  projectName: string
  projectCover?: string
  @IsIn([1, 2, 3, 4, 5])
  processTemplate: string
}
