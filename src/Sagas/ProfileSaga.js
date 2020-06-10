import { call, put } from 'redux-saga/effects'
import ProfileActions from '../Redux/ProfileRedux'
import LoginActions from '../Redux/LoginRedux'
import UserActions from '../Redux/UserRedux'

export function * profileUpdateUsername (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileUpdateUsernameSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}

export function * profileUpdateMainAddress (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileUpdateMainAddressSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}

export function * profileAddAddress (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileAddAddressSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}

export function * profileDeleteAddress (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileDeleteAddressSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}

export function * profileChangeWatchword (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileChangeWatchwordSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}

export function * profileChangePassword (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ProfileActions.profileChangePasswordSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(ProfileActions.profileFailure(res.message))
    }
  } catch (error) {
    yield put(ProfileActions.profileFailure(error.message))
  }
}
