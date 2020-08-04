// 抽奖
import request from '@/utils/requestT'
//活动报名列表
export function activeList(param) {
    return request({
        url: '/dev-api/wxactivity/main/wxlist',
        method: 'get',
        params: param
    })
}
//活动报名详情
export function getMain(param) {
    return request({
        url: '/dev-api/wxactivity/main/detail/?id=' + param,
        method: 'get',

    })
}

//活动报名详情
export function userAdd(param) {
    return request({
        url: '/dev-api/wxactivity/user/add',
        method: 'post',
        data: param
    })
}
//是否报名
export function findByOpenId(param) {
    return request({
        url: '/dev-api/wxactivity/user/activityUser',
        method: 'get',
        params: param
    })
}
//签到
export function signIn(param) {
    return request({
        url: '/dev-api/wxactivity/main/signIn',
        method: 'get',
        params: param
    })
}
//取消报名
export function cancelApply(param) {
    return request({
        url: '/dev-api/wxactivity/user/cancelApply',
        method: 'post',
        data: param
    })
}