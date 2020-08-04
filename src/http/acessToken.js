
// 读取本地文件(readAccessToken)
// 1 本地有文件
// 1-1判断是否过期(isValidAccessToken)
// 1-1-2 过期了
// 重新请求（getAccessToken） 保存下拉(saveAccessToken)
// 1-1-3 没有过期
// 直接使用
// 2本地没有文件
// 发送请求（getAccessToken）保存下拉(saveAccessToken)
import request from '@/utils/request'
const config = {
    token: '',
    appID: "wxbceb93d019230257",
    appsecret: "c261e9e40b217bff10170521093e3c5d"
}
// getAccessToken
export function getAccessToken() {
    return request({
        url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`,
        method: '',
    })
}
// getJsapiTicker
export function getJsapiTicker(data) {
    return request({
        url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${data}&type=jsapi`,
        method: '',
    
    })
}

