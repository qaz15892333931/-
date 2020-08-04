// 抽奖
import request from '@/utils/requestT'
//获取试题
export function generatePaper(data) {
    return request({
        url: '/dev-api/answer/wx/user-master/generatePaper',
        method: 'post',
        data: data
    })
}
//下一题
export function nextQuestion(data) {
    return request({
        url: '/dev-api/answer/wx/user-slave/nextQuestion',
        method: 'get',
        params: data
    })
}
// 做题情况
export function answeredQuestions(data) {
    return request({
        url: '/dev-api/answer/wx/user-slave/answeredQuestions',
        method: 'get',
        params: data
    })
}
// 交卷
export function carryOut(data) {
    return request({
        url: '/dev-api/answer/wx/user-master/carryOut',
        method: 'post',
        data: data
    })
}

