import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// vuex的插件 控制台会打印修改记录以及之前的state是什么
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 在开发环境下开启vuex的调试工具，测试state数据是否是由mutations修改
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  plugins: debug ? [createLogger()] : []
})
