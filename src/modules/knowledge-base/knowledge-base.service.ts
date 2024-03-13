import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { KnowLedge } from '~/modules/knowledge-base/model/knowLedge.model'

@Injectable()
export class KnowledgeBaseService {
  constructor(@InjectModel(KnowLedge) private kbModel: typeof KnowLedge) {}
  getKnowledgeBaseList() {
    return this.kbModel.findAll()
  }
}
