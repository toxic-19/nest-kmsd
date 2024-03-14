import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { KnowLedge } from '~/modules/knowledge-base/model/knowLedge.model'
import { UpdateIsTopDto } from './dto/update-kb.dto'
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
}
