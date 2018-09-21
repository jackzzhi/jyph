export default {
  errorHandler (error, _this) {
    let errorInfo = {
      type: 1
    }
    if (error.response === undefined) {
      errorInfo.errorText = '网络连接错误，请检查网络是否已经连接！'
      errorInfo.isRefresh = false
      _this.setErrorInfo(errorInfo)
    } else {
      switch (error.response.status) {
        case 400:
          errorInfo.errorText = '请求错误！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 401:
          errorInfo.errorText = '未授权，请登录！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 403:
          errorInfo.errorText = '拒绝访问！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 404:
          errorInfo.errorText = '请求地址出错，请查看地址是否正确！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 408:
          errorInfo.errorText = '请求超时！'
          errorInfo.isRefresh = true
          _this.setErrorInfo(errorInfo)
          break
        case 500:
          errorInfo.errorText = '服务器内部错误！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 501:
          errorInfo.errorText = '服务未实现！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 502:
          errorInfo.errorText = '网关错误！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 503:
          errorInfo.errorText = '服务不可用！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
          break
        case 504:
          errorInfo.errorText = '网关超时！'
          errorInfo.isRefresh = true
          _this.setErrorInfo(errorInfo)
          break
        default:
          errorInfo.errorText = '接口请求错误！'
          errorInfo.isRefresh = false
          _this.setErrorInfo(errorInfo)
      }
    }
  }
}
