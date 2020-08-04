import request from '@/utils/requestT'
// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/dev-api/system/dict/data/wx/dictType/' + query,
    method: 'get',

  })
}
// 根据字典id查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/dev-api/system/dict/data/dictType/' + dictType,
    method: 'get'
  })
}


// 新增.修改字典数据
export function addData(data) {
  return request({
    url: '/api/api-web/dic',
    method: 'post',
    data: data
  })
}

// 删除字典数据
export function delData(query) {
  return request({
    url: '/api/api-web/dic/del',
    method: 'delete',
    params: query
  })
}