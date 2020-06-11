import { applyMiddleware, compose, createStore } from 'redux'
import Client from 'shopify-buy'
// import thunk from 'redux-thunk'
import { throttle } from 'lodash'
import { loadState, saveState } from './localStorage'
import { setShop, createClient, createCheckout } from '../shopify/shopifyActions'
import rootReducer from './reducers'

const cadClient = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

const usdClient = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_US_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_US_SHOP_NAME}.myshopify.com`,
})


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
  const middleware = [
    // thunk.withExtraArgument(getFirebase),
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

  // Build correct client based on country
  const shopify = store.getState().shopify
  const client = shopify.currency === 'CAD' ? cadClient : usdClient
  store.dispatch(createClient(client))

  if (!shopify.checkout) {
    // Create new checkout
    client.checkout.create().then((checkout) => {
      store.dispatch(createCheckout(checkout));
    })
    // Fetch shop details
    client.shop.fetchInfo().then((shop) => {
      store.dispatch(setShop(shop));
    })
    // Fetch all products
    // client.product.fetchAll(250).then((products) => {
    //   store.dispatch(setProducts(products));
    // })
  }

  return store
}