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

// const tempFahrenheit = atom({
//   key: 'tempFahrenheit',
//   default: 32,
//   persistence_UNSTABLE: {
//     type: 'localStorage'
//   }
// });

// const tempCelcius = selector({
//   key: 'tempCelcius',
//   get: ({ get }) => ((get(tempFahrenheit) - 32) * 5) / 9,
//   set: ({ set }, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
// });

const activeCurrency = atom({
  key: "activeCurrency",
  default: "CAD",
  persistence_UNSTABLE: {
    type: 'localStorage'
  }
})

const checkoutCAD = atom({
  key: "checkoutCAD",
  default: false,
  persistence_UNSTABLE: {
    type: 'localStorage'
  }
})
const checkoutUSD = atom({
  key: "checkoutUSD",
  default: false,
  persistence_UNSTABLE: {
    type: 'localStorage'
  }
})

const activeCheckout = atom({
  key: "activeCheckout",
  default: false,
  persistence_UNSTABLE: {
    type: 'localStorage'
  }
})

// const activeCheckout = selector({
//   key: "activeCheckout",
//   get: ({ get }) => get(activeCurrency) === "CAD" ? checkoutCAD : checkoutUSD,
//   set: ({ set, get }, newCheckout) => {
//     get(activeCurrency) === "CAD"
//       ? set(checkoutCAD, newCheckout)
//       : set(checkoutUSD, newCheckout)
//   }
// })

const activeStore = selector({
  key: "activeStore",
  get: ({ get }) => get(activeCurrency) === "CAD" ? canadianStore : usStore
})

// const activeCheckout = selector({
//   key: "activeCheckout",
//   get: async ({ get }) => {
//     // return await get(activeStore).checkout.fetch(get(activeCheckoutID))
//     return "hello"
//   },
//   set: ({ set }, newValue) => set(activeCheckoutID, newValue.id)
// })



export { activeCurrency, activeStore, activeCheckout }