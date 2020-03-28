import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

export const defaultStoreContext = {
  client,
  adding: false,
  checkout: { lineItems: [] },
  country: "CAN",
  showSelectCountry: false,
  products: [],
  shop: {},
  addVariantToCart: () => { },
  removeLineItem: () => { },
  updateLineItem: () => { },
  switchStore: () => { },
}

const StoreContext = React.createContext(defaultStoreContext)

export default StoreContext