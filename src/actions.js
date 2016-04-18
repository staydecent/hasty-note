import {
  CREATE_NOTE, 
  LOAD_NOTE, 
} from './consts.js'

// actions can be anything. in our case we'll stick with objects
// containing two properties: type and data
export default {
  createNote,
  loadNote,
  generic,
}


function createNote(title) {
  console.debug('createNote', title)
  return {
    type: CREATE_NOTE,
    data: title,
  }
}

function loadNote(title) {
  console.debug('loadNote', LOAD_NOTE, title)
  return {
    type: LOAD_NOTE,
    data: title,
  }
}

// For actions that have no side effects or async-ness
function generic(type, data) {
  console.debug('generic', type, data)
  return {type, data}
}