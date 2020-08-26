import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../shopify/shopifySagas'
import { ShopifyTransform } from './localStorage'
import rootReducer from './reducers'

const persistConfig = { // configuration object for redux-persist
  key: 'shopify',
  storage, // define which storage to use
  transforms: [ShopifyTransform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer()) // create a persisted reducer

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
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  sagaMiddleware.run(rootSaga)

  return store
}