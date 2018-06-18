import axios from 'axios'
import { commonParams } from './config'

export function getVkey(mid) {
  const url = '/api/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 7595976838
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.data.items[0].vkey)
  })
}

export function getLyric(mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
