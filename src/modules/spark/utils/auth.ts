import axios from 'axios'
import * as CryptoJS from 'crypto-js/crypto-js.js'
import * as fs from 'fs'
import FormData = require('form-data')
class DocumentUpload {
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

  getHeader(formData) {
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

const httpUploadUrl = 'https://chatdoc.xfyun.cn/openapi/fileUpload'
const APPID = 'eb7b67d3'
const API_SECRET = 'ZmViMTc1MDk0ZGI1ZDgzMGM1YTVlYTdi'
const curTime = Math.floor(Date.now() / 1000).toString()
const documentUpload = new DocumentUpload(APPID, API_SECRET, curTime)

export const uploadDocument = async (fileTitle: string) => {
  const formData = new FormData()
  // const blob = new Blob([content], { type: 'text/plain' })
  const fileStream = fs.createReadStream('files/信息系统.md')
  formData.append('file', fileStream)
  // formData.append('url', '')
  formData.append('fileName', `信息系统.md`)
  formData.append('fileType', 'wiki')
  // formData.append('needSummary', 'false')
  // formData.append('stepByStep', 'false')
  // formData.append('callbackUrl', 'your_callbackUrl')

  const headers = documentUpload.getHeader(formData)
  try {
    const response = await axios.post(httpUploadUrl, formData, { headers })
    console.log('Response:', response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
