import { IsNotEmpty } from 'class-validator'

export class GetTaskByProcessDto {
  @IsNotEmpty({ message: '所属项目id不能为空' })
  projectId: number
  @IsNotEmpty({ message: '所属流程不能为空' })
  processName: string
}
