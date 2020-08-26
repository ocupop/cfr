import { takeLatest, call, put, all } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/lib/constants'

import Client from 'shopify-buy'
import { loadChannel, finishLoad, updateChannel } from './shopifyActions'
import { arrayToObject } from '../common/utils/helpers'

const CAD = {
  channelId: 'CAD',
  client: Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  })
}

const USD = {
  channelId: 'USD',
  client: Client.buildClient({
    storefrontAccessToken: process.env.GATSBY_US_SHOPIFY_ACCESS_TOKEN,
    domain: `${process.env.GATSBY_US_SHOP_NAME}.myshopify.com`,
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
  console.log("Fetching Checkout")
  try {
    // const activeCheckout = checkoutId
    //   ? await client.checkout.fetch(checkoutId)
    //   : await client.checkout.create()

    const activeCheckout = await client.checkout.create()

    return activeCheckout
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

function* updateChannelDetails(channel) {
  const { channelId, client } = channel
  const [products, shop] = yield all([
    call(fetchAllProducts, client),
    call(fetchShopInfo, client),
  ])

  yield put(updateChannel({
    channelId,
    client,
    products,
    shop,
  }))

}

function* addChannel(channel) {
  const { channelId, client } = channel

  const [products, shop, checkout] = yield all([
    call(fetchAllProducts, client),
    call(fetchShopInfo, client),
    call(fetchCheckout, client)
  ])

  yield put(loadChannel({
    channelId,
    client,
    products,
    shop,
    checkout
  }))

}

function* refreshAllChannels(action) {
  const { payload } = action
  try {
    // loop through channels
    yield all(channels.map(channel => {
      if (payload) {
        return call(updateChannelDetails, channel)
      }

      return call(addChannel, channel)
    }))

    // finish loading
    yield put(finishLoad())

  } catch (error) {
    console.log("ERR:", error)
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(REHYDRATE, refreshAllChannels),
  ])
}