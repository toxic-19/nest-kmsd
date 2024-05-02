const progressTemplates = {
  '1': ['产品评审', 'UI设计', ['前端', '后端'], '联调', '测试', '验收'],
  '2': ['市场调研', '产品定义', '设计原型', '开发测试', '用户测试', '产品发布'],
  '3': ['前端任务分解', '设计实现方案', '自测Bug', '联调', '验收'],
  '4': ['后端任务分解', '设计实现方案', '自测Bug', '联调', '验收'],
  '5': ['创建产品、执行', '关联需求', '团队管理', '分解任务', '跟踪进度'],
  '6': ['撰写用例', '执行用例', '提交Bug', '验证Bug', '关闭Bug'],
  '7': ['学习', '预研', '感兴趣', '缺陷', '复习'],
  '8': ['当前计划'],
}
export const TEMPLATE_MAP = new Map([
  [1, progressTemplates['1']],
  [2, progressTemplates['2']],
  [3, progressTemplates['3']],
  [4, progressTemplates['4']],
  [5, progressTemplates['5']],
  [6, progressTemplates['6']],
  [7, progressTemplates['7']],
  [8, progressTemplates['8']],
])

export enum HangUP {
  'isIng',
  'hangUp',
}
