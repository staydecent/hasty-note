import atom from 'atom'

import {
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
  console.log('reducer', state, action)
  switch (action.type) {
    case SET_URL:
      state.url = action.data
      return state
    case SET_SUGGESTIONS:
      state.suggestions = action.data
      return state
    case RESET_SUGGESTIONS:
      state.suggestions = state.titles
      return state
    case SET_LIST_POS:
      state.listPos = action.data
      return state
    default:
      return state
  }
}