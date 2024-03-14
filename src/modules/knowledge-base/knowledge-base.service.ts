import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { KnowLedge } from '~/modules/knowledge-base/model/knowLedge.model'
import { UpdateIsTopDto } from './dto/update-kb.dto'
import { CreateKbDto } from './dto/create-kb.dto'
@Injectable()
export class KnowledgeBaseService {
  constructor(@InjectModel(KnowLedge) private kbModel: typeof KnowLedge) {}
  getKnowledgeBaseList() {
    return this.kbModel.findAll()
  }
  // 置顶或者取消置顶 post body {id isTop}
  cancelTop(updateIsTopDto: UpdateIsTopDto) {
    const { id, isTop } = updateIsTopDto
    return this.kbModel.update(
      { isTop },
      {
        where: {
          id: id,
        },
      },
    )
  }
  // 新建知识库
  createNewBase(createKbDto: CreateKbDto) {
    const { kbName, kbDesc } = createKbDto
    return this.kbModel.create({
      kbName,
      kbDesc,
    })
  }
}
