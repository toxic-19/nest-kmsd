import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { History, Session, UploadFile } from './model/spark.model'
import { CreateSessionDto, SaveHistoryDto } from '~/modules/spark/dto/create-spark.dto'
import { DELTYPE } from '~/modules/spark/constant'
import { DeleteSessionDto, ReNameDto } from '~/modules/spark/dto/update-spark.dto'
import { RespMap } from '~/common/interceptor/respMap'
import { GetHistoryDto, GetSavedFileDto } from '~/modules/spark/dto/get-spark.dto'
import * as fs from 'fs'
import { fileSummary, uploadDocument } from './utils/auth'
import { where } from 'sequelize'
@Injectable()
export class SparkService {
  constructor(
    @InjectModel(Session) private sessionModel: typeof Session,
    @InjectModel(History) private historyModel: typeof History,
    @InjectModel(UploadFile) private uploadFileModel: typeof UploadFile,
  ) {}
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

  // 将文本转换为为md文件并上传
  async changeToMdFile(dto: GetSavedFileDto) {
    const { content, title, articleId, needSummary } = dto
    fs.writeFileSync(`files/${title}.md`, content) // 同步函数
    const fileDto = await uploadDocument(title) // 知识库上传文件 返回 fileId和sid
    // fs.renameSync('files/测试.txt', 'files/测试.md')
    if (fileDto.code === 0) {
      if (needSummary) {
        // 调用文档总结
        this.getfileSummary(fileDto.fileId)
      }
      // 保存到数据库中
      await this.uploadFileModel.create({
        ...fileDto,
        articleId,
      })
    }
  }
  async getfileSummary(fileId: string, restart?: boolean) {
    const {
      dataValues: { summary: summaryInDateBase },
    } = await this.uploadFileModel.findOne({
      where: {
        fileId: fileId,
      },
    })
    if (summaryInDateBase) {
      if (!restart) return summaryInDateBase
    }
    const summaryRes = await fileSummary(fileId)
    if (summaryRes.code === 0) {
      // 保存到数据库中
      this.uploadFileModel.update({ summary: summaryRes.data.summary }, { where: { fileId: fileId } })
    }
    return summaryRes.data.summary || null
  }
}
