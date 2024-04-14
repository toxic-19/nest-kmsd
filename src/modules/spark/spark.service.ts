import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { History, Session } from './model/spark.model'
import { CreateSessionDto } from '~/modules/spark/dto/create-spark.dto'
import { DELTYPE } from '~/modules/spark/constant'
import { DeleteSessionDto, ReNameDto } from '~/modules/spark/dto/update-spark.dto'
import { RespMap } from '~/common/interceptor/respMap'
@Injectable()
export class SparkService {
  constructor(@InjectModel(Session) private sessionModel: typeof Session, @InjectModel(History) private historyModel: typeof History) {}
  // 获取会话列表
  getSession() {
    return this.sessionModel.findAll({
      where: {
        isDel: DELTYPE.notDel,
      },
    })
  }
  // 新增会话
  createSession(createSessionDto: CreateSessionDto) {
    return this.sessionModel.create({ ...createSessionDto })
  }
  // 会话重命名 TODO: 重名的情况暂未考虑
  async reNameSession(reNameDto: ReNameDto) {
    const { sessionId, sessionName } = reNameDto
    if (sessionId && sessionName) {
      const res = await this.sessionModel.update(
        {
          sessionName,
        },
        {
          where: {
            id: sessionId,
          },
        },
      )
      return res[0] === 1 ? sessionId : RespMap.get('updateError')
    }
    return RespMap.get('noArgs')
  }
  // 删除会话
  async deleteSession(deleteSessionDto: DeleteSessionDto) {
    const { sessionId } = deleteSessionDto
    if (!sessionId) {
      return RespMap.get('noArgs')
    }
    const res = await this.sessionModel.update(
      {
        isDel: DELTYPE.deleted,
      },
      {
        where: {
          id: sessionId,
        },
      },
    )
    return res[0] === 1 ? sessionId : RespMap.get('delError')
  }
}
