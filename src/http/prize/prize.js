// 抽奖
import request from '@/utils/requestT'

// 首页数据
export function prizeList(data) {
    return request({
        url: '/dev-api/wx-ld-main/list',
        method: 'get',
        params: data
    })
}
// 详情数据
export function prizeDetails(data) {
    return request({
        url: '/dev-api/weixin/ld-main/detail',
        method: 'get',
        params: data
    })
}


// 点击开始抽奖
export function drawAwards(id) {
    return request({
        url: '/dev-api/weixin/ld-main/lottery',
        method: 'get',
        params: id
    })
}

//中奖名单
export function desensitizationList(id) {
    return request({
        url: '/dev-api/wxld/user-log/desensitizationList',
        method: 'get',
        params: id
    })
}

//分享
export function share(param) {
    return request({
        url: '/dev-api/wx/tool/jsapi/share',
        method: 'get',
        params: param
    })
}
//获取用户总积分
export function getWxUser(param) {
    return request({
        url: '/dev-api/wxuser/sms/getWxUser',
        method: 'get',
        params: param
    })
}
//分享成功
export function shareSuccess(param) {
    return request({
        url: '/dev-api/wx-ld-main/shareCallback',
        method: 'get',
        params: param
    })
}