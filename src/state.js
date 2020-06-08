import { atom, selector } from 'recoil'
import Client from 'shopify-buy'

const canadianStore = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

const usStore = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_US_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_US_SHOP_NAME}.myshopify.com`,
})
const activeCountry = atom({
  key: "activeCountry",
  default: "CA"
})
const activeCheckout = atom({
  key: "activeCheckout",
  default: ''
})
// const cart = atom({
//   key: "cart",
//   default: []
// })

const activeStore = selector({
  key: "activeStore",
  get: ({ get }) => {
    return get(activeCountry) === "CA" ? canadianStore : usStore
  }
})


export { activeCountry, activeStore, activeCheckout }