import { takeLatest, call, put, select, all } from 'redux-saga/effects'
import {
  SET_CURRENCY,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_BEGIN,
} from './shopifyConstants'

import Client from 'shopify-buy'
import { setProducts, setShop, setCheckout, setClient } from './shopifyActions'
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


async function fetchAllProducts() {
  console.log("Fetching Products From Shopify")
  try {
    const products = await client.product.fetchAll(250)
    return products
  } catch (error) {
    return error
  }
}
// async function fetchCADProducts() {
//   console.log("Fetching Products From CAD Store")
//   try {
//     const products = await cadClient.product.fetchAll(250)

//     return products
//   } catch (error) {
//     return error
//   }
// }
// async function fetchUSDProducts() {
//   console.log("Fetching Products From USD Store")
//   try {
//     const products = await usdClient.product.fetchAll(250)

//     return products
//   } catch (error) {
//     return error
//   }
// }


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

function* updateProducts() {
  const currency = yield select(getCurrency)
  client = currency === 'CAD' ? cadClient : usdClient

  yield put({
    type: FETCH_PRODUCTS_BEGIN,
    payload: {
      loading: true
    }
  })
  try {
    // call the api to get the shop products
    const products = yield call(fetchAllProducts)
    // save the products in state
    yield put(setProducts(arrayToObject(products, 'id')))

    return products

  } catch (error) {
    yield put({
      type: FETCH_PRODUCTS_FAIL,
      payload: {
        error,
        loading: false
      }
    })
    return error
  }

}

function* setStore(action) {
  const currency = yield select(getCurrency)
  const cadCheckout = yield select(getCADCheckout)
  const usdCheckout = yield select(getUSDCheckout)

  const checkout = currency === 'CAD' ? cadCheckout : usdCheckout
  client = currency === 'CAD' ? cadClient : usdClient

  try {
    const shop = yield call(fetchShopInfo)
    const activeCheckout = yield call(fetchCheckout, checkout)
    yield call(updateProducts)
    // const cadProducts = yield call(fetchCADProducts)
    // const usdProducts = yield call(fetchUSDProducts)
    // const products = currency === 'CAD' ? cadProducts : usdProducts
    yield put(setClient(client))
    yield put(setShop(shop))
    yield put(setCheckout(activeCheckout))
    // yield put(setProducts(arrayToObject(products, 'id')))
    // yield put(setUSDProducts(arrayToObject(usdProducts, 'id')))
    // yield put(setCADProducts(arrayToObject(cadProducts, 'id')))

  } catch (error) {
    console.log("ERR:", error)
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(SET_CURRENCY, setStore)
  ]);
}