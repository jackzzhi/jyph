import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {
  num: 0,
  isShowBranch: false,
  areaType: '',
  changeSizeNum: 0,
  rankingShow: false,
  detailInfo: {
    show: false,
    type: '',
    title: '',
    titleSec: '',
    data: null,
    index: null
  },
  detailShow: false,
  detailType: '',
  detailTitle: '',
  initDataOne: null,
  initDataTwo: null,
  branchData: null,
  isLoading: false,
  againRequest: 0,
  requestData: {},
  errorInfo: {
    type: 0,
    errorText: '',
    isRefresh: false
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
