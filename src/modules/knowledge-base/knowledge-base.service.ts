import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { KnowLedge } from './model/knowLedge.model'
import { UpdateIsTopDto } from './dto/update-kb.dto'
import { CreateKbDto } from './dto/create-kb.dto'
@Injectable()
export class KnowledgeBaseService {
  constructor(@InjectModel(KnowLedge) private kbModel: typeof KnowLedge) {}
  // 查询知识库列表
  getKnowledgeBaseList() {
    return this.kbModel.findAll({
      where: {
        isDel: false,
      },
    })
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
    const { kbName, kbDesc, isTop } = createKbDto
    const defaultImage =
      'https://s1-imfile.feishucdn.com/static-resource/v1/v2_4ab6fa8c-8ad2-4157-ba1e-ff171636e57g~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp'
    return this.kbModel.create({
      kbName,
      kbDesc,
      cover: defaultImage,
      isTop,
    })
  }
}
