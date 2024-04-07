import { IsIn, IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
  projectId: number
  processName: string
  @IsNotEmpty({ message: '任务名称不能为空' })
  taskName: string
  @IsNotEmpty({ message: '任务状态不能为空' })
  @IsIn([0, 1, 2, 3, 4])
  taskStatus: number
  @IsNotEmpty({ message: '任务预计人力不能为空' })
  days: number
  @IsNotEmpty({ message: '任务计划开始时间不能为空' })
  dateStart: Date
  @IsNotEmpty({ message: '任务计划结束时间不能为空' })
  dateEnd: Date
}
