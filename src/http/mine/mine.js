// 抽奖
import request from '@/utils/requestT'
//获取用户信息
export function getWxUser(param) {
    return request({
        url: '/dev-api/wxuser/sms/getWxUser',
        method: 'get',
        params: param
    })
}