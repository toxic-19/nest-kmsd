import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { History, Session } from './model/spark.model'
import { CreateSessionDto, SaveHistoryDto } from '~/modules/spark/dto/create-spark.dto'
import { DELTYPE } from '~/modules/spark/constant'
import { DeleteSessionDto, ReNameDto } from '~/modules/spark/dto/update-spark.dto'
import { RespMap } from '~/common/interceptor/respMap'
import { GetHistoryDto } from '~/modules/spark/dto/get-spark.dto'
import * as fs from 'fs'
import { uploadDocument } from './utils/auth'
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
  // 保存记录
  saveHistory(historyDto: SaveHistoryDto) {
    const { sessionId, userInput, assistantResponse } = historyDto
    // 确保是已存在的sessionId
    if (this.isLegalId(sessionId) && userInput && assistantResponse) {
      const data = [
        { role: 'user', content: userInput, sessionId },
        { role: 'assistant', content: assistantResponse, sessionId },
      ]
      return this.historyModel.bulkCreate(data)
    }
    return RespMap.get('noArgs')
  }
  async isLegalId(sessionId: number) {
    const res = await this.sessionModel.findOne({
      where: {
        id: sessionId,
        isDel: DELTYPE.notDel,
      },
    })
    return res !== null
  }
  // 获取sessionId下的聊天记录
  getHistoriesBySessionId(query: GetHistoryDto) {
    const { sessionId, page = 1, pageSize = 10 } = query
    return this.historyModel.findAll({
      where: {
        sessionId,
      },
      offset: pageSize * (page - 1),
      limit: pageSize,
    })
  }

  // 将文本转换为为md文件
  changeToMdFile(content: string, title: string) {
    fs.writeFileSync(`files/${title}.md`, content)
    uploadDocument(title)
    // fs.renameSync('files/测试.txt', 'files/测试.md')
  }
}
