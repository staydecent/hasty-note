import atom from 'atom'

import {mergeState} from './services/storage.js'
import reducer from './services/reducer.js'


let initialState = mergeState({
  titles: [],
  suggestions: [],
  listPos: -1,
})

let store = atom(reducer, initialState)

export default store