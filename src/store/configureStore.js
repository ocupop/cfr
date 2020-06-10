import { applyMiddleware, compose, createStore } from 'redux'
// import thunk from 'redux-thunk'
import Client from 'shopify-buy'
import { throttle } from 'lodash'
import { loadState, saveState } from './localStorage'
import { createClient, fetchProducts, cadClient, usdClient, fetchCheckout, getShop } from '../shopify/shopifyActions'
import rootReducer from './reducers'


export default function createReduxStore(initialState = {}) {
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
  const middleware = [
    // thunk.withExtraArgument(getFirebase),
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }), 1000)
  const client = Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  })
  store.dispatch(createClient(client))

  const cadStore = Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  })
  store.dispatch(cadClient(cadStore))

  const usStore = Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_US_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_US_SHOP_NAME}.myshopify.com`,
  })
  store.dispatch(usdClient(usStore))


  client.product.fetchAll(250).then((products) => {
    store.dispatch(fetchProducts(products));
  })

  client.checkout.create().then((checkout) => {
    store.dispatch(fetchCheckout(checkout));
  })
  client.shop.fetchInfo().then((shop) => {
    store.dispatch(getShop(shop));
  })

  return store
}