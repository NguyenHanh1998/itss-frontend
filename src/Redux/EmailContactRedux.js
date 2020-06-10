
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  emailContactRequest: ['params'],
  emailContactSuccess: ['data'],
  emailContactFailure: ['error'],
  clearData: null
})

export const EmailContactTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const emailContactRequest = state => state.merge({ fetching: true, error: null })
export const emailContactSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const emailContactSuccess = (state, { data }) => {
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

export const emailContactFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EMAIL_CONTACT_REQUEST]: emailContactRequest,
  [Types.EMAIL_CONTACT_SUCCESS]: emailContactSuccess,
  [Types.EMAIL_CONTACT_FAILURE]: emailContactFailure
})
