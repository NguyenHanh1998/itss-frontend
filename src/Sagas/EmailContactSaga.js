import { call, put } from 'redux-saga/effects'
import EmailContactActions from '../Redux/EmailContactRedux'
import LoginActions from '../Redux/LoginRedux'
export function * emailContact (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(EmailContactActions.emailContactSuccess(res.data))
    } else {
      yield put(EmailContactActions.emailContactFailure(res.message))
    }
  } catch (error) {
    yield put(EmailContactActions.emailContactFailure(error.message))
  }
}
