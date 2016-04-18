import {STORAGE_KEY} from '../consts.js'

export default {
  mergeState,
  syncState,
}

function mergeState(state) {
  try {
    // Assing localStorage values to our state
    let lsState = JSON.parse(localStorage.getItem(STORAGE_KEY))
    let lsStateKeys = Object.keys(lsState)
    for (let x = lsStateKeys.length - 1; x >= 0; x--) {
      state[lsStateKeys[x]] = lsState[lsStateKeys[x]]
    }

    // If we are loading a note off the bat, highlight the suggestion
    if (state.loadedNoteTitle && state.titles) {
      state.listPos = state.titles.indexOf(state.loadedNoteTitle)
      state.suggestions = state.titles
    }
  } catch (err) {
    console.error('Failed to load state from localStorage!', err)
  }

  return state
}

function syncState(state) {
  try {
    const str = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, str)
  } catch (err) {
    console.error('Failed to sync state', err)
  }
}