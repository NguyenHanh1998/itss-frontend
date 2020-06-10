
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendingHistoryRequest: ['params'],
  sendingHistorySuccess: ['data'],
  sendingHistoryFailure: ['error'],
  clearData: null
})

export const SendingHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const sendingHistoryRequest = state => state.merge({ fetching: true, error: null })
export const sendingHistorySuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const sendingHistorySuccess = (state, { data }) => {
  data.data.forEach(element => {
    if (element.option && element.option === 'delete') {
      let newData = Object.assign({}, state.objects)
      delete newData[element.id]
      state = state.setIn(['objects'], newData)
    } else {
      state = state.setIn(['objects', element.id], element)
    }
  })
  state = state.setIn(['fetching'], false)
  state = state.setIn(['data'], data)
  return state
}
*/

export const sendingHistoryFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SENDING_HISTORY_REQUEST]: sendingHistoryRequest,
  [Types.SENDING_HISTORY_SUCCESS]: sendingHistorySuccess,
  [Types.SENDING_HISTORY_FAILURE]: sendingHistoryFailure
})
