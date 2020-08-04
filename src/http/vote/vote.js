
import request from '@/utils/requestT'

// 列表数据
export function voteList(data) {
    return request({
        url: '/dev-api/wx/vote/main/list',
        method: 'get',
        params: data
    })
}
// 详情数据
export function voteDetail(data) {
    return request({
        url: '/dev-api/wx/vote/main/detail',
        method: 'get',
        params: data
    })
}