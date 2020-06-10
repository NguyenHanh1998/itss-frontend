import apisauce from 'apisauce'
import ApiConfig from '../Config/ApiConfig'
const autoBind = require('react-autobind')
class API {
  constructor (loginToken, baseURL = ApiConfig.baseURL) {
    this.api = apisauce.create({
      // base URL is read from the "constructor"
      baseURL,
      // here are some default headers
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Authorization': localStorage.getItem('loginToken') ? 'jwt ' + localStorage.getItem('loginToken') : ''
      },
      // 15 second timeout...
      timeout: 15000
    })
    // const naviMonitor = (response) => // console.log('hey!  listen! ', response)
    // this.api.addMonitor(naviMonitor)

    this.loginToken = loginToken

    autoBind(this)
  }

  authenticated (loginToken) {
    // console.log('loginToken', loginToken)
    this.loginToken = loginToken
    // localStorage.setItem('loginToken', loginToken)
    this.api.setHeader('Authorization', 'jwt ' + loginToken)
  }

  handleUnauthorizedRequest (rawResponse) {
    if (rawResponse.status === 401) {
      this.authenticated('')
      return true
    }
    return false
  }

  preprocessResponse (rawResponse) {
    if (!rawResponse) {
      return {message: 'No response'}
    }

    if (this.handleUnauthorizedRequest(rawResponse)) {
      return {message: 'Unauthorized'}
    }

    let result = rawResponse.data || {}
    result.success = result.status === 'success'
    return result
  }

  login (params) {
    return this.api.post('login', params).then(data => {
      let result = data.data
      result.success = result.status === 'success'
      if (result.success) {
        this.authenticated(result.data.access_token)
      }
      return result
    })
  }

  logout () {
    return this.api.get('logout').then(result => {
      this.authenticated('')
      return result
    })
  }

  register (params) {
    return this.api.post('register', params).then(data => {
      let result = data.data
      if (!result) {
        return {message: 'No response'}
      }
      result.success = result.status === 'success'
      if (result.success) {
        this.authenticated(result.data.access_token)
      }
      return result
    })
  }

  resendEmail (params) {
    return this.api.post('resend_email', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  verifyEmail (params) {
    return this.api.get('verify', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  resetPassword (params) {
    return this.api.post('reset_password', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  forgotPassword (params) {
    return this.api.post('forgot_password', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  updateUsername (params) {
    return this.api.post('update_username', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  updateMainAddress (params) {
    return this.api.post('update_main_address', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  changeWatchword (params) {
    return this.api.post('change_watchword', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  changePassword (params) {
    return this.api.post('change_password', params).then(data => {
      return this.preprocessResponse(data)
    })
  }



  emailContact (params) {
    return this.api.post('email_contact', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  userUpdate (params) {
    return this.api.post('user_update', params).then(data => {
      return this.preprocessResponse(data)
    })
  }

  user (params) {
    return this.api.get('me').then(data => {
      return this.preprocessResponse(data)
    })
  }
}

let api = new API()

export default api
