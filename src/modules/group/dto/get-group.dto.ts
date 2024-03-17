import { IsNotEmpty } from 'class-validator'

export class GetGroupIdDto {
  @IsNotEmpty({ message: '所属知识库Id不能为空' })
  knowId: number
}
