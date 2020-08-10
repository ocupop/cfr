import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { throttle } from 'lodash'
import { loadState, saveState } from './localStorage'
import { setCurrency } from '../shopify/shopifyActions'
import { rootSaga } from '../shopify/shopifySagas'
import rootReducer from './reducers'


export default function createReduxStore() {
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (typeof window !== `undefined`) {
    if (window && window.location && window.location.hostname === 'localhost') {
      const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
      if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
      }
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    sagaMiddleware
    // thunk
    // thunk.withExtraArgument(getClient),
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  // const initialState = loadState()
  const initialState = loadState() || {}
  const store = createStore(
    rootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )
  store.subscribe(throttle(() => {
    saveState(store.getState())
  }), 1000)

  sagaMiddleware.run(rootSaga)

  if (!loadState()) {
    store.dispatch(setCurrency('CAD'))
  }

  return store
}