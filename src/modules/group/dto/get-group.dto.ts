import { IsNotEmpty } from 'class-validator'

export class GetGroupIdDto {
  @IsNotEmpty({ message: '所属知识库Id不能为空' })
  knowId: number
}

export class CreateGroupDto {
  @IsNotEmpty({ message: '所属知识库Id不能为空' })
  knowId: number
  @IsNotEmpty({ message: '分组title不能为空' })
  groupName: string
}

export class UpdateGroupDto {
  @IsNotEmpty({ message: '分组Id不能为空' })
  groupId: number
  @IsNotEmpty({ message: '重命名的groupName不能为空' })
  groupName: string
}
