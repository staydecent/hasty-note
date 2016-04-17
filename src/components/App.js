import h from 'virtual-dom/h'
import R from 'ramda'
import flyd from 'flyd'
import afterSilence from 'flyd/module/aftersilence'

import store from '../store.js'
import {INPUT_THRESHOLD, KEY, RESET_SUGGESTIONS} from '../consts.js'
import {generic} from '../actions.js'

import {handleArrowKeys, searchTitles} from '../services/app-helpers.js'

export default App

const valueIn = R.curryN(2, (whitelist, val) => R.contains(val, whitelist))

function App(state) {
  let {listPos, suggestions, titles} = state
  suggestions = (suggestions.length) ? suggestions : titles

  console.debug('App', state)

  // Handle text input
  // ----
  const inputStream = flyd.stream()

  // get value from dom event
  const inputValue = flyd.map(ev => ev.target.value, inputStream)

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
  flyd.transduce(R.compose(
    R.map(ev => ev.keyCode),
    R.filter(valueIn([KEY.UP, KEY.DOWN])),
    R.map(handleArrowKeys)
  ), keyDownStream)

  // Handle form submission
  // ----
  const submitStream = flyd.stream()
  flyd.on(ev => ev.preventDefault(), submitStream)
  flyd.transduce(R.compose(
    R.map(_ => inputValue()), // we want the inputValue not the form event
    R.map(val => console.debug('sub', val)),
  ), submitStream)


  // Render our template
  // ----
  return <div>
    <form name="search-or-create" onsubmit={submitStream}>
      <input 
        type="text" 
        name="soc-input" 
        value={inputValue()}
        oninput={inputStream}
        onkeydown={keyDownStream} />
    </form>

    {suggestions.map(x => <p>{x}</p>)}
  </div>
}