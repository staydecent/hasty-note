import vdomHyperscript from 'virtual-dom/h'
import hyperscriptHook from 'virtual-hyperscript-hook'

const h = hyperscriptHook(vdomHyperscript)

import nextTick from 'next-tick'
import R from 'ramda'
import flyd from 'flyd'
import afterSilence from 'flyd/module/aftersilence'

import store from '../store.js'
import {generic, createNote, loadNote} from '../actions.js'
import {
  INPUT_THRESHOLD, 
  KEY, 
  RESET_SUGGESTIONS, 
  CLEAR_LOADED_NOTE_TITLE
} from '../consts.js'

import {handleArrowKeys, searchTitles} from '../services/app-helpers.js'

import Suggestions from './Suggestions.js'

export default App


const valueIn = R.curryN(2, (whitelist, val) => R.contains(val, whitelist))

function App(state) {
  let {listPos, suggestions, titles, loadedNoteTitle} = state
  suggestions = (suggestions.length) ? suggestions : titles

  console.debug('App', state)

  // Handle text input
  // ----
  const inputStream = flyd.stream()

  // get value from dom event
  const inputValue = flyd.map(ev => ev.target.value, inputStream)
  if (loadedNoteTitle) {
    flyd.on(_ => store.dispatch(generic(CLEAR_LOADED_NOTE_TITLE)), inputValue)
  }

  // filter and debounce input to search function
  flyd.transduce(R.compose(
    R.map(R.last),
    R.filter(val => val.length > INPUT_THRESHOLD),
    R.map(searchTitles),
  ), afterSilence(250, inputValue))

  // Reset suggestions when empty
  flyd.transduce(R.compose(
    R.map(val => val.length),
    R.filter(R.equals(0)),
    R.map(_ => store.dispatch(generic(RESET_SUGGESTIONS))),
  ), inputValue)

  // Handle arrow keys
  // ----
  const keyDownStream = flyd.stream()
  const arrowStream = flyd.transduce(R.compose(
    R.map(ev => ev.keyCode),
    R.filter(valueIn([KEY.UP, KEY.DOWN])),
  ), keyDownStream)
  flyd.on(_ => keyDownStream().preventDefault(), arrowStream)
  flyd.on(handleArrowKeys, arrowStream)


  // Handle form submission
  // ----
  const submitStream = flyd.stream()
  flyd.on(ev => {
    ev.preventDefault()
    if (listPos === -1) {
      store.dispatch(createNote(inputValue()))
    } else {
      store.dispatch(loadNote(suggestions[listPos]))
    }
  }, submitStream)


  // Render our template
  // ----
  const focusHook = (elm) => nextTick(() => elm.focus())

  return <div id="app">
    <form name="search-or-create" onsubmit={submitStream}>
      <input 
        type="text" 
        name="soc-input" 
        value={loadedNoteTitle || inputValue()}
        oninput={inputStream}
        onkeydown={keyDownStream}
        hook={focusHook} />
    </form>

    <Suggestions suggestions={suggestions} pos={listPos} />
  </div>
}