import { IsNotEmpty } from 'class-validator'

export class UpdateProjectDto {}

export class UpdateProjectName {
  @IsNotEmpty({ message: '重命名时名称不能为空' })
  projectName: string
  @IsNotEmpty({ message: '请传递需要修改的项目id' })
  id: number
}
export class HangupProjectQuery {
  @IsNotEmpty()
  isHangUp: boolean
  @IsNotEmpty({ message: '请传递需要挂起的项目id' })
  id: number
}
