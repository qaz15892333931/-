// 抽奖
import request from '@/utils/requestT'

// 列表数据
export function mineList(data) {
    return request({
        url: '/dev-api/wxld/user-log/listByUser',
        method: 'get',
        params: data
    })
}