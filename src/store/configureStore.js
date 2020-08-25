import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { throttle, isEmpty } from 'lodash'
import { loadState, saveState } from './localStorage'
import { loadShopify } from '../shopify/shopifyActions'
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

  const initialState = loadState() || {}
  const store = createStore(
    rootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )
  // store.subscribe(throttle(() => {
  //   saveState(store.getState())
  // }), 1000)

  sagaMiddleware.run(rootSaga)

  // Setting the currency begins a process of fetching products and creating a client for future requests
  if (isEmpty(initialState)) {
    console.log("This is a new visitor")
    store.dispatch(loadShopify('CAD'))
    return store
  }

  return store
}