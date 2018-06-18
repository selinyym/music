import axios from 'axios'
import { commonParams } from './config'

export function getHotKey() {
  const url = '/api/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function search(query, page, zhida, perpage) {
  const url = '/api/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage,
    n: perpage,
    zhidaqu: 1,
    platform: 'h5',
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    uid: 0,
    remoteplace: 'txt.mqq.all'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
