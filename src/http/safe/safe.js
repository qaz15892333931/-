// 抽奖
import request from '@/utils/requestT'

// 列表数据
export function safeList(data) {
    return request({
        url: '/dev-api/wxnews/list',
        method: 'get',
        params: data
    })
}
//查询详情
export function safeDetail(data) {
    return request({
        url: '/dev-api/wxnews/detail',
        method: 'get',
        params: data
    })
}