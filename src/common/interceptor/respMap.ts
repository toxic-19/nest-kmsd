export const RespMap = new Map([
  [
    'noArgs',
    {
      httpStatus: '0',
      responseMessage: '缺少参数',
      success: false,
    },
  ],
  [
    'error',
    {
      httpStatus: '0',
      responseMessage: '系统故障',
      success: false,
    },
  ],
  [
    'updateError',
    {
      httpStatus: '0',
      responseMessage: '修改失败',
      success: false,
    },
  ],
  [
    'delError',
    {
      httpStatus: '0',
      responseMessage: '删除失败',
      success: false,
    },
  ],
  [
    'noArticleId',
    {
      httpStatus: '0',
      responseMessage: '该文档无法查询',
      success: false,
    },
  ],
  [
    'tagHasExisted',
    {
      httpStatus: '0',
      responseMessage: '该标签已经存在',
      success: false,
    },
  ],
])
