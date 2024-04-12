import { Injectable } from '@nestjs/common'
import * as CryptoJS from 'crypto-js/crypto-js.js'
import { WebSocket } from 'ws'
@Injectable()
export class SparkService {
  private httpUrl = new URL('https://spark-api.xf-yun.com/v1.1/chat')
  private modelDomain = ''
  public APPID = 'eb7b67d3'
  public API_SECRET = 'ZmViMTc1MDk0ZGI1ZDgzMGM1YTVlYTdi'
  public API_KEY = 'e577238d7a4c27b7484a487c830003b2'
  private ttsWS: any
  private totalResults = ''
  // websocket协议通用鉴权
  getWebsocketUrl(): Promise<string> {
    // 动态获取domain信息
    switch (this.httpUrl.pathname) {
      case '/v1.1/chat':
        this.modelDomain = 'general'
        break
      case '/v2.1/chat':
        this.modelDomain = 'generalv2'
        break
      case '/v3.1/chat':
        this.modelDomain = 'generalv3'
        break
      case '/v3.5/chat':
        this.modelDomain = 'generalv3.5'
        break
    }
    return new Promise((resolve) => {
      const apiKey = this.API_KEY
      const apiSecret = this.API_SECRET

      let url = 'wss://' + this.httpUrl.host + this.httpUrl.pathname
      // 鉴权参数: host【请求的主机】 date【当前时间戳】 authorization【base64编码的签名方式】
      const host = 'localhost:9951' // 前端发起请求的地址
      const date = new Date().toUTCString() // toGMTString已被ES6废弃

      const algorithm = 'hmac-sha256'
      const headers = 'host date request-line'
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${this.httpUrl.pathname} HTTP/1.1`
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
      const signature = CryptoJS.enc.Base64.stringify(signatureSha)
      const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
      const authorization = btoa(authorizationOrigin)

      url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
      resolve(url)
    })
  }
  // 拼接参数
  generateParam(chatDto) {
    const { input } = chatDto
    return {
      header: {
        app_id: this.APPID,
        uid: 'fd3f47e4-d',
      },
      parameter: {
        chat: {
          domain: this.modelDomain,
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          // 历史聊天记录
          text: [
            {
              role: 'user',
              content: '中国第一个皇帝是谁？',
            },
            {
              role: 'assistant',
              content: '秦始皇',
            },
            {
              role: 'user',
              content: '秦始皇修的长城吗',
            },
            {
              role: 'assistant',
              content: '是的',
            },
            {
              role: 'user',
              content: input,
            },
          ],
        },
      },
    }
  }

  async chatWithSpark(chatDto, res) {
    return await this.requestByStream(chatDto, res)
  }
  async requestByStream(chatDto, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    // 连接websocket
    const url = await this.getWebsocketUrl()
    const ttsWS = new WebSocket(url)
    ttsWS.onopen = () => {
      // websocket发送数据
      const params = this.generateParam(chatDto)
      ttsWS.send(JSON.stringify(params))
    }
    ttsWS.onmessage = (e) => {
      const resultData = e.data
      const jsonData = JSON.parse(resultData)
      this.totalResults = this.totalResults + resultData
      res.write('data: ' + JSON.stringify(jsonData) + '\n\n')

      // 提问失败
      if (jsonData.header.code !== 0) {
        alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
        return `${jsonData.header.code}:${jsonData.header.message}`
      }
      if (jsonData.header.code === 0 && jsonData.header.status === 2) {
        ttsWS.close()
        return
      }
    }
    ttsWS.onerror = () => {
      alert('WebSocket报错，请f12查看详情')
      console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
      res.end()
    }
    ttsWS.onclose = () => {
      console.log('Close WebSocket')
      res.end()
    }
  }
}
