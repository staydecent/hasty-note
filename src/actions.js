import {
  CREATE_NOTE, 
  LOAD_NOTE, 
  SET_URL, 
} from './consts.js'

// actions can be anything. in our case we'll stick with objects
// containing two properties: type and data
export default {
  createNote,
  loadNote,
  setUrl,
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

function setUrl(url) {
  if (url !== window.location.pathname) {
    window.history.pushState({}, '', url)
  }
  return {
    type: SET_URL,
    data: url,
  }
}

// For actions that have no side effects or async-ness
function generic(type, data) {
  console.debug('generic', type, data)
  return {type, data}
}