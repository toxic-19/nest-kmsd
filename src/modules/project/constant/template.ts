const progressTemplates = {
  '1': ['产品评审', ['前端', '后端'], '联调', '测试', '验收'],
}
export const TEMPLATE_MAP = new Map([[1, progressTemplates['1']]])

export enum HangUP {
  'isIng',
  'hangUp',
}
