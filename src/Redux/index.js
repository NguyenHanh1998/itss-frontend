import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
// import { reducer as formReducer } from 'redux-form'

import ReduxPersistConfig from '../Config/ReduxPersistConfig'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const appReducer = combineReducers({
    verifyEmail: require('./VerifyEmailRedux').reducer,
    emailContact: require('./EmailContactRedux').reducer,
    profile: require('./ProfileRedux').reducer,
    forgotPassword: require('./ForgotPasswordRedux').reducer,
    resetPassword: require('./ResetPasswordRedux').reducer,
    resendVerifyEmail: require('./ResendVerifyEmailRedux').reducer,
    user: require('./UserRedux').reducer,
    login: require('./LoginRedux').reducer,
    register: require('./RegisterRedux').reducer
  })

  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
      state = undefined
    } else if (action.type === 'CLEAR_DATA') {
      state = {
        ...appReducer({}, {}),
        login: (state && state.login) || {},
        startup: (state && state.startup) || {}
      }
    }
    return appReducer(state, action)
  }

  const persistedReducer = persistReducer(ReduxPersistConfig.storeConfig, rootReducer)

  return configureStore(persistedReducer, rootSaga)
}
