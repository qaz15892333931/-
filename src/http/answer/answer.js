// 抽奖
import request from '@/utils/requestT'
//获取答题列表
export function answerList(param) {
    return request({
        url: '/dev-api/answer/wx/exam-paper/list',
        method: 'get',
        params: param
    })
}
//获取答题列表详情数据
export function answerDetail(param) {
    return request({
        url: '/dev-api/answer/wx/exam-paper/statistics',
        method: 'get',
        params: param
    })
}
//排行榜
export function selectRanks(param) {
    return request({
        url: '/dev-api/answer/wx/user-master/selectRanks',
        method: 'get',
        params: param
    })
}
//自己排名
export function selectonlyRank(param) {
    return request({
        url: '/dev-api/answer/wx/user-master/selectRank',
        method: 'get',
        params: param
    })
}
//发起单位
export function deptList(param) {
    return request({
        url: '/dev-api/wxactivity/sponsored/unity/list',
        method: 'get',
        params: param
    })
}
//获得积分详情
export function statistics(param) {
    return request({
        url: '/dev-api/answer/wx/exam-paper/statistics',
        method: 'get',
        params: param
    })
}
//查看最近一次的做题记录
export function answerNewDetail(param) {
    return request({
        url: '/dev-api/answer/wx/user-slave/answerDetail',
        method: 'get',
        params: param
    })
}
//验证
// export function generatePaper(param) {
//     return request({
//         url: '/dev-api/answer/wx/user-master/generatePaper',
//         method: 'get',
//         params: param
//     })
// }