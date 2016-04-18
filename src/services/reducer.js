import {
  CREATE_NOTE,
  LOAD_NOTE,
  CLEAR_LOADED_NOTE_TITLE,
  SET_SUGGESTIONS,
  RESET_SUGGESTIONS,
  SET_LIST_POS,
} from '../consts.js'

export default reducer

function reducer(action, state) {
  console.log('reducer', action)
  
  switch (action.type) {

    case CREATE_NOTE:
      return state

    case LOAD_NOTE:
      state.loadedNoteTitle = action.data
      return state

    case CLEAR_LOADED_NOTE_TITLE:
      state.loadedNoteTitle = undefined
      return state

    case SET_SUGGESTIONS:
      state.suggestions = action.data
      state.listPos = -1
      return state

    case RESET_SUGGESTIONS:
      state.suggestions = state.titles
      state.listPos = -1
      return state

    case SET_LIST_POS:
      state.listPos = action.data
      return state

    default:
      return state
  }
}