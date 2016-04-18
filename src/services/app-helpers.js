import fuzzy from 'fuzzy'

import store from '../store.js'
import {generic} from '../actions.js'
import {KEY, SET_LIST_POS, SET_SUGGESTIONS} from '../consts.js'

// Helpers usually take a value from a Stream, and based on that value, call an Action.
// They're the middlemen between your Component and Actions, in order to keep component 
// files a bit more clean.
export default {
  handleArrowKeys,
  searchTitles,
}

function handleArrowKeys(key) {
  let {suggestions, listPos} = store.getState()
  const max = suggestions.length - 1

  if (key === KEY.UP && listPos > 0) {
    listPos--
  } else if (key === KEY.DOWN && listPos < max || listPos === -1) {
    listPos++
  }
  store.dispatch(generic(SET_LIST_POS, listPos))
}

function searchTitles(str) {
  const {titles} = store.getState()
  const results = fuzzy.filter(str, titles)
  const matches = results.map(item => item.string)
  store.dispatch(generic(SET_SUGGESTIONS, matches))
}