import vdom from 'virtual-dom'
import main from 'main-loop'

import store from './store.js'
import {setUrl} from './actions.js'

import App from './components/App.js'


// User navigation (ex. browser back button)
window.onpopstate = () => store.dispatch(setUrl(window.location.pathname))


// Render our main App component
let loop = main(store.getState(), App, vdom)

document.body.appendChild(loop.target)
store.subscribe(() => loop.update(store.getState()))


