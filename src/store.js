import atom from 'atom'

import {
  CREATE_NOTE,
  LOAD_NOTE,
  CLEAR_LOADED_NOTE_TITLE,
  SET_URL,
  SET_SUGGESTIONS,
  RESET_SUGGESTIONS,
  SET_LIST_POS,
} from './consts.js'


let initialState = {
  url: window.location.pathname,
  titles: [
    'Contradiction',
    'foundlost',
    'gitlance',
    'postachio',
    'Music',
    'python setup',
    'lightroom',
    'timelapse',
    'spa and progressive enhancement',
    'to buy',
    'Walking to San Augustin',
    'The fallacy of the green revolution',
    'nspower',
  ],
  suggestions: [],
  listPos: -1,
}

let store = atom(reducer, initialState)

export default store

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

    case SET_URL:
      state.url = action.data
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