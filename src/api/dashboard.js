import request from '@/utils/request'
//得到ip地址
export function getIp() {
  return request({
    url: 'https://restapi.amap.com/v3/ip?key=11de960a6fb0b0846beb32368ce29a84',
    method: 'get'
  })
}