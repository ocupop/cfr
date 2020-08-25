import { takeLatest, call, put, all } from 'redux-saga/effects'
import { LOAD_SHOPIFY } from './shopifyConstants'

import Client from 'shopify-buy'
import { loadChannel, finishLoad } from './shopifyActions'
import { arrayToObject } from '../common/utils/helpers'

const CAD = {
  id: 'CAD',
  client: Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  })
}

const USD = {
  id: 'USD',
  client: Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  })
}

const channels = [CAD, USD]


async function fetchAllProducts(client) {
  console.log("Fetching Products From Shopify")
  try {
    const products = await client.product.fetchAll(250)
    // return an object
    return arrayToObject(products, 'id')

  } catch (error) {
    return error
  }
}


async function fetchCheckout(client) {
  console.log("Fetching New Checkout")
  try {
    // const activeCheckout = checkout
    //   ? await client.checkout.fetch(checkout.id)
    //   : await client.checkout.create()
    const checkout = await client.checkout.create()

    return checkout
  } catch (error) {
    return error
  }
}

async function fetchShopInfo(client) {
  console.log("Fetching Shop Details")
  try {
    const shop = await client.shop.fetchInfo()

    return shop
  } catch (error) {
    return error
  }
}


function* addChannel(channel) {
  const { id, client } = channel
  const [products, shop, checkout] = yield all([
    call(fetchAllProducts, client),
    call(fetchShopInfo, client),
    call(fetchCheckout, client)
  ])

  yield put(loadChannel({
    id,
    client,
    products,
    shop,
    checkout
  }))

}

function* loadAllChannels(action) {
  // const { payload: { activeChannel } } = action

  try {
    // loop through channels
    yield all(channels.map(channel => call(addChannel, channel)))
    // finish loading
    yield put(finishLoad())

  } catch (error) {
    console.log("ERR:", error)
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(LOAD_SHOPIFY, loadAllChannels),
  ]);
}