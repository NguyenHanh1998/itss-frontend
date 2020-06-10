import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import api from '../Services/Api'
/* ------------- Types ------------- */
import { VerifyEmailTypes } from '../Redux/VerifyEmailRedux'
import { EmailContactTypes } from '../Redux/EmailContactRedux'
import { SendingHistoryTypes } from '../Redux/SendingHistoryRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { ResetPasswordTypes } from '../Redux/ResetPasswordRedux'
import { ResendVerifyEmailTypes } from '../Redux/ResendVerifyEmailRedux'
import { UserTypes } from '../Redux/UserRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
/* ------------- Sagas ------------- */
import { verifyEmail } from './VerifyEmailSaga'
import { emailContact } from './EmailContactSaga'
import { sendingHistory } from './SendingHistorySaga'
import { profileUpdateUsername, profileChangeWatchword, profileChangePassword } from './ProfileSaga'
import { forgotPassword } from './ForgotPasswordSaga'
import { resetPassword } from './ResetPasswordSaga'
import { resendVerifyEmail } from './ResendVerifyEmailSaga'
import { user, userUpdate } from './UserSaga'
import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'
import { register } from './RegisterSaga'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    // tool generated sagas
    takeLatest(UserTypes.USER_UPDATE, userUpdate, api.userUpdate),
    takeLatest(UserTypes.USER_REQUEST, user, api.user),
    takeLatest(VerifyEmailTypes.VERIFY_EMAIL_REQUEST, verifyEmail, api.verifyEmail),
    takeLatest(EmailContactTypes.EMAIL_CONTACT_REQUEST, emailContact, api.emailContact),
    takeEvery(SendingHistoryTypes.SENDING_HISTORY_REQUEST, sendingHistory, api.getSendingHistory),
    // Login
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api.login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api.logout),

    // Register
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api.register),

    // Resend Verify Email
    takeLatest(ResendVerifyEmailTypes.RESEND_VERIFY_EMAIL_REQUEST, resendVerifyEmail, api.resendEmail),

    // Reset Password
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api.resetPassword),

    // Forgot Password
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api.forgotPassword),

    // Profile: update username
    takeLatest(ProfileTypes.PROFILE_UPDATE_USERNAME_REQUEST, profileUpdateUsername, api.updateUsername),
    // Profile: change watchword
    takeLatest(ProfileTypes.PROFILE_CHANGE_WATCHWORD_REQUEST, profileChangeWatchword, api.changeWatchword),
    // Profile: change password
    takeLatest(ProfileTypes.PROFILE_CHANGE_PASSWORD_REQUEST, profileChangePassword, api.changePassword)
  ])
}
