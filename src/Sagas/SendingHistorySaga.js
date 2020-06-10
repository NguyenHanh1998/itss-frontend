import { call, put } from 'redux-saga/effects'
import SendingHistoryActions from '../Redux/SendingHistoryRedux'
import LoginActions from '../Redux/LoginRedux'
export function * sendingHistory (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(SendingHistoryActions.sendingHistorySuccess(res.data))
    } else {
      yield put(SendingHistoryActions.sendingHistoryFailure(res.message))
    }
  } catch (error) {
    yield put(SendingHistoryActions.sendingHistoryFailure(error.message))
  }
}
