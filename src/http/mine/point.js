// 抽奖
import request from '@/utils/requestT'
//消耗积分列表
export function integralList(param) {
    return request({
        url: '/dev-api/weixin/user-integral/list',
        method: 'get',
        params: param
    })
}