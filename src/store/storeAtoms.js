import { atom } from 'recoil'
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

const activeCountry = atom({
  key: "activeCountry",
  default: "CA"
})


export { activeCountry, client }