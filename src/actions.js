import {
  SET_URL, 
} from './consts.js'

// actions can be anything. in our case we'll stick with objects
// containing two properties: type and data
export default {
  setUrl,
  generic,
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