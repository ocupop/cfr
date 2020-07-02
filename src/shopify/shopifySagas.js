import { takeLatest, call, put, select, all } from 'redux-saga/effects'
import {
  SET_CURRENCY,
  // FETCH_PRODUCTS_FAIL,
  // FETCH_PRODUCTS_BEGIN
} from './shopifyConstants'

import Client from 'shopify-buy'
import { setProducts, setShop, setCheckout } from './shopifyActions'
import { arrayToObject } from '../common/utils/helpers'

const cadClient = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

const usdClient = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_US_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_US_SHOP_NAME}.myshopify.com`,
})

let client = cadClient

const getCurrency = (state) => state.shopify.currency
// const getCheckout = (state) => state.shopify.checkout
const getCADCheckout = (state) => state.shopify.cadcheckout
const getUSDCheckout = (state) => state.shopify.usdcheckout


// export function fetchProducts() {
//   console.log("Fetching Products")
//   return dispatch => {
//     dispatch(fetchProductsBegin())
//     client.product.fetchAll(250)
//       .then((products) => {
//         dispatch(setProducts(products))
//         return products
//       })
//       .catch(error => { fetchProductsFail(error) })
//   }
// }

async function fetchAllProducts() {
  console.log("Fetching Products From Shopify")
  try {
    const products = await client.product.fetchAll(250)
    return products
  } catch (error) {
    return error
  }
}

async function fetchCheckout(checkout) {
  console.log("Fetching Checkout:", checkout)
  try {
    const activeCheckout = checkout
      ? await client.checkout.fetch(checkout.id)
      : await client.checkout.create()

    return activeCheckout
  } catch (error) {
    return error
  }
}

async function fetchShopInfo() {
  console.log("Fetching Shop Details")
  try {
    const shop = await client.shop.fetchInfo()

    return shop
  } catch (error) {
    return error
  }
}

// function* updateProducts() {
//   const currency = yield select(getCurrency)
//   client = currency === 'cad' ? cadClient : usdClient

//   yield put({
//     type: FETCH_PRODUCTS_BEGIN,
//   })
//   try {
//     // call the api to get the shop products
//     const products = yield call(fetchAllProducts)
//     console.log(products)
//     // save the products in state
//     yield put(setProducts(arrayToObject(products, 'id')))

//   } catch (error) {
//     yield put({
//       type: FETCH_PRODUCTS_FAIL,
//       payload: {
//         error
//       }
//     })
//   }

// }

function* setStore(action) {
  const currency = yield select(getCurrency)
  const cadCheckout = yield select(getCADCheckout)
  const usdCheckout = yield select(getUSDCheckout)

  const checkout = currency === 'cad' ? cadCheckout : usdCheckout
  client = currency === 'cad' ? cadClient : usdClient

  try {
    const shop = yield call(fetchShopInfo)
    const activeCheckout = yield call(fetchCheckout, checkout)
    const products = yield call(fetchAllProducts)

    yield put(setShop(shop))
    yield put(setCheckout(activeCheckout))
    yield put(setProducts(arrayToObject(products, 'id')))

  } catch (error) {
    console.log("ERR:", error)
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(SET_CURRENCY, setStore)
  ]);
}