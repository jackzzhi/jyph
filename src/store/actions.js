import * as types from './mutations-type.js'
export default {
  addNum (context) {
    context.commit(types.ADD_NUM, 10)
  },
  toggleBranch ({commit}, params) {
    commit(types.TOGGLE_BRANCH, params)
  },
  changeSize ({commit}) {
    commit(types.CHANGE_SIZE)
  },
  toggleRanking ({commit}) {
    commit(types.TOGGLE_RANKING)
  },
  changeDetailInfo ({commit}, param) {
    commit(types.CHANGE_DETAIL_INFO, param)
  },
  setInitDataOne ({commit}, param) {
    commit(types.SET_INIT_DATA_ONE, param)
  },
  setInitDataTwo ({commit}, param) {
    commit(types.SET_INIT_DATA_TWO, param)
  },
  setBranchData ({commit}, param) {
    commit(types.SET_BRANCH_DATA, param)
  },
  toggleLoading ({commit}, param) {
    commit(types.TOGGLE_LOADING, param)
  },
  againRequestEvent ({commit}) {
    commit(types.AGAIN_REQUEST_EVENT)
  },
  setRequestData ({commit}, param) {
    commit(types.SET_REQUEST_DATA, param)
  },
  setErrorInfo ({commit}, param) {
    commit(types.SET_ERROR_INFO, param)
  }
}
