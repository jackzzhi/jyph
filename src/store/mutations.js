import * as types from './mutations-type.js'
export default {
  [types.ADD_NUM] (state, params) {
    state.num += params
  },
  [types.TOGGLE_BRANCH] (state, params) {
    state.isShowBranch = !state.isShowBranch
    state.areaType = params
  },
  [types.CHANGE_SIZE] (state) {
    state.changeSizeNum++
  },
  [types.TOGGLE_BRANCH] (state) {
    state.rankingShow = !state.rankingShow
  },
  [types.CHANGE_DETAIL_INFO] (state, param) {
    state.detailInfo = param
  },
  [types.SET_INIT_DATA_ONE] (state, param) {
    state.initDataOne = param
  },
  [types.SET_INIT_DATA_TWO] (state, param) {
    state.initDataTwo = param
  },
  [types.SET_BRANCH_DATA] (state, param) {
    state.branchData = param
  },
  [types.TOGGLE_LOADING] (state, param) {
    state.isLoading = param
  },
  [types.AGAIN_REQUEST_EVENT] (state) {
    state.againRequest++
  },
  [types.SET_REQUEST_DATA] (state, param) {
    state.requestData.data = param.data
    state.requestData.params = param.params
  },
  [types.SET_ERROR_INFO] (state, param) {
    state.errorInfo.type = param.type
    state.errorInfo.errorText = param.errorText
    state.errorInfo.isRefresh = param.isRefresh
  }
}
