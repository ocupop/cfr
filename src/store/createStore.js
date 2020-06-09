import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { getFirebase } from 'react-redux-firebase'
import rootReducer from './reducers'

export const history = createBrowserHistory()

export default function createReduxStore(initialState = {}) {
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  if (window && window.location && window.location.hostname === 'localhost') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase),
    routerMiddleware(history)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  return store
}