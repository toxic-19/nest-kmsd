import axios from 'axios'
import * as CryptoJS from 'crypto-js/crypto-js.js'
import * as fs from 'fs'
import FormData = require('form-data')
class DocumentChat {
  public appId: string
  public apiSecret: string
  public timeStamp: string
  constructor(appId: string, APISecret: string, timestamp: string) {
    this.appId = appId
    this.apiSecret = APISecret
    this.timeStamp = timestamp
  }

  getOriginSignature() {
    const data = this.appId + this.timeStamp
    return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex)
  }

  getSignature() {
    const signatureOrigin = this.getOriginSignature()
    return CryptoJS.HmacSHA1(signatureOrigin, this.apiSecret).toString(CryptoJS.enc.Base64)
  }

  getHeader(formData: FormData) {
    const signature = this.getSignature()
    const headers = {
      ...formData.getHeaders(),
      appId: this.appId,
      timestamp: this.timeStamp,
      signature: signature,
    }
    return headers
  }
}

const httpSummaryUrl = 'https://chatdoc.xfyun.cn/openapi/fileSummary'
const httpStartSummary = 'https://chatdoc.xfyun.cn/openapi/startSummary'
const httpUploadUrl = 'https://chatdoc.xfyun.cn/openapi/fileUpload'
const APPID = 'eb7b67d3'
const API_SECRET = 'ZmViMTc1MDk0ZGI1ZDgzMGM1YTVlYTdi'

export const uploadDocument = async (fileTitle: string) => {
  const curTime = Math.floor(Date.now() / 1000).toString()
  const documentChat = new DocumentChat(APPID, API_SECRET, curTime)
  const formData = new FormData()
  // const blob = new Blob([content], { type: 'text/plain' })
  const fileStream = fs.createReadStream(`files/${fileTitle}.md`)
  formData.append('file', fileStream)
  // formData.append('url', '')
  formData.append('fileName', `${fileTitle}.md`)
  formData.append('fileType', 'wiki')
  // formData.append('needSummary', 'false')
  // formData.append('stepByStep', 'false')
  // formData.append('callbackUrl', 'your_callbackUrl')

  const headers = documentChat.getHeader(formData)
  try {
    const response = await axios.post(httpUploadUrl, formData, { headers })
    console.log('Response:', response.data)
    const {
      sid,
      code,
      data: { fileId },
    } = response.data
    return { code, sid, fileId }
  } catch (error) {
    // console.error('Error:', error)
    return { code: -1 }
  }
}

export const fileSummary = async (fileId: string) => {
  const curTime = Math.floor(Date.now() / 1000).toString()
  const documentChat = new DocumentChat(APPID, API_SECRET, curTime)
  const formData = new FormData()
  formData.append('fileId', fileId)
  const headers = documentChat.getHeader(formData)
  try {
    const response = await axios.post(httpStartSummary, formData, { headers })
    return {
      code: response.data.code,
      data: response.data.data,
    }
    // if (response.data.code === 0) {
    //   const summary = await axios.post(httpStartSummary, formData, { headers })
    //   console.log('get', summary.data)
    // }
  } catch (error) {
    console.log('Error', error)
    return { code: -1 }
  }
}
