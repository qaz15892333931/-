import request from '@/utils/request'

// 获取验证码
export function phoneSms(data) {
    return request({
        url: '/dev-api/wxuser/sms/phoneSms',
        method: 'post',
        data: data
    })
}
// 验证验证码
export function checkPhoneCodes(data) {
    return request({
        url: '/dev-api/wxuser/sms/checkPhoneCode',
        method: 'post',
        data: data
    })
}
// 根据openID获取微信用户信息
export function getUser(data) {
    return request({
        url: '/dev-api/wxuser/sms/getLoginWxUser',
        params: data,
        method: 'get',

    })
}
// 省市区
export function areaLists(data) {
    return request({
        url: '/dev-api/system/nv/area/list',
        params: data,
        method: 'get',

    })
}
// 街道
export function streetLists(data) {
    return request({
        url: '/dev-api/system/nv/towns/areaId',
        params: data,
        method: 'get',

    })
}
// 社区
export function communityList(data) {
    return request({
        url: '/dev-api/system/nv/village/listByName',
        params: data,
        method: 'get',

    })
}
//小区
export function plotList(data) {
    return request({
        url: '/dev-api/system/nv/community/listByName',
        params: data,
        method: 'get',

    })
}
// 微信认证(保存)
export function authentification(data) {
    return request({
        url: '/dev-api/wxuser/nv/authentification',
        data: data,
        method: 'post',

    })
}