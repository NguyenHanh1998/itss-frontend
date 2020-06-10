
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileUpdateUsernameRequest: ['params'],
  profileUpdateUsernameSuccess: ['changeUsernameData'],
  profileUpdateMainAddressRequest: ['params'],
  profileUpdateMainAddressSuccess: ['updateMainAddressData'],
  profileAddAddressRequest: ['params'],
  profileAddAddressSuccess: ['addAddressData'],
  profileDeleteAddressRequest: ['params'],
  profileDeleteAddressSuccess: ['deleteAddressData'],
  profileChangeWatchwordRequest: ['params'],
  profileChangeWatchwordSuccess: ['changeWatchwordData'],
  profileChangePasswordRequest: ['params'],
  profileChangePasswordSuccess: ['changePasswordData'],
  profileFailure: ['error'],
  clearData: null
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  changeUsernameData: null,
  updateMainAddressData: null,
  addAddressData: null,
  deleteAddressData: null,
  changeWatchwordData: null,
  changePasswordData: null,
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */
export const profileUpdateUsernameRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileUpdateUsernameSuccess = (state, { changeUsernameData }) => state.merge({ fetching: false, error: null, changeUsernameData })

export const profileUpdateMainAddressRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileUpdateMainAddressSuccess = (state, { updateMainAddressData }) => state.merge({ fetching: false, error: null, updateMainAddressData })

export const profileAddAddressRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileAddAddressSuccess = (state, { addAddressData }) => state.merge({ fetching: false, error: null, addAddressData })

export const profileDeleteAddressRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileDeleteAddressSuccess = (state, { deleteAddressData }) => state.merge({ fetching: false, error: null, deleteAddressData })

export const profileChangeWatchwordRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileChangeWatchwordSuccess = (state, { changeWatchwordData }) => state.merge({ fetching: false, error: null, changeWatchwordData })

export const profileChangePasswordRequest = state => state.merge({ fetching: true, error: null, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null })
export const profileChangePasswordSuccess = (state, { changePasswordData }) => state.merge({ fetching: false, error: null, changePasswordData })

export const profileFailure = (state, { error }) => state.merge({ fetching: false, changeUsernameData: null, updateMainAddressData: null, addAddressData: null, changeWatchwordData: null, changePasswordData: null, deleteAddressData: null, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_UPDATE_USERNAME_REQUEST]: profileUpdateUsernameRequest,
  [Types.PROFILE_UPDATE_USERNAME_SUCCESS]: profileUpdateUsernameSuccess,
  [Types.PROFILE_UPDATE_MAIN_ADDRESS_REQUEST]: profileUpdateMainAddressRequest,
  [Types.PROFILE_UPDATE_MAIN_ADDRESS_SUCCESS]: profileUpdateMainAddressSuccess,
  [Types.PROFILE_ADD_ADDRESS_REQUEST]: profileAddAddressRequest,
  [Types.PROFILE_ADD_ADDRESS_SUCCESS]: profileAddAddressSuccess,
  [Types.PROFILE_DELETE_ADDRESS_REQUEST]: profileDeleteAddressRequest,
  [Types.PROFILE_DELETE_ADDRESS_SUCCESS]: profileDeleteAddressSuccess,
  [Types.PROFILE_CHANGE_WATCHWORD_REQUEST]: profileChangeWatchwordRequest,
  [Types.PROFILE_CHANGE_WATCHWORD_SUCCESS]: profileChangeWatchwordSuccess,
  [Types.PROFILE_CHANGE_PASSWORD_REQUEST]: profileChangePasswordRequest,
  [Types.PROFILE_CHANGE_PASSWORD_SUCCESS]: profileChangePasswordSuccess,
  [Types.PROFILE_FAILURE]: profileFailure
})
