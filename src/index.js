import vdom from 'virtual-dom'
import main from 'main-loop'

import store from './store.js'
import {syncState} from './services/storage.js'

import App from './components/App.js'


// Render our main App component
let loop = main(store.getState(), App, vdom)

document.body.appendChild(loop.target)
store.subscribe(() => loop.update(store.getState()))
store.subscribe(() => syncState(store.getState()))


