
import request from '@/utils/requestT'
// 解析
export function answerDetail(data) {
    return request({
        url: '/dev-api/answer/wx/user-slave/answerDetail',
        method: 'get',
        params: data
    })
}
// 单题详情
export function answerById(id) {
    return request({
        url: '/dev-api/answer/wx/user-slave/answerById/' + id,
        method: 'get',
    })
}
