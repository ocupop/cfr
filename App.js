import React from 'react'
import { RecoilRoot, useTransactionObservation_UNSTABLE } from 'recoil'
import { Provider } from 'react-redux'
import Client from 'shopify-buy'
import createStore from './src/store/createStore'
import ReduxToastr from 'react-redux-toastr'
import ModalWrapper from './src/common/modals/ModalWrapper'
import Layout from './src/containers/Layout'
import { createClient, fetchProducts, cadClient, usdClient, fetchCheckout, getShop } from './src/shopify/shopifyActions'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'flag-icon-css/css/flag-icon.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'

import {
  activeCurrency,
  activeCheckout,
} from './src/store/recoil'

// TODO: As recoil evolves, i believe that there is or will be a better way to to do this.
const atoms = {
  activeCurrency,
  activeCheckout
}

function PersistenceObserver() {
  useTransactionObservation_UNSTABLE(({ atomValues, atomInfo, modifiedAtoms }) => {
    for (const modifiedAtom of modifiedAtoms) {
      // console.log(modifiedAtom)
      window.localStorage.setItem(
        modifiedAtom,
        JSON.stringify({ value: atomValues.get(modifiedAtom) })
      )
    }
  })
  return null
}

const initializeState = ({ set }) => {
  for (const [key, value] of Object.entries(window.localStorage)) {
    const data = JSON.parse(value)
    if (atoms[key]) {
      set(atoms[key], data.value)
    }
  }
}



const store = createStore()
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
});

const App = ({ element }) => {

  return (
    <Provider store={store}>
      <RecoilRoot initializeState={initializeState}>
        <PersistenceObserver />
        <ModalWrapper />
        <Layout>
          {element}
        </Layout>
        <ReduxToastr
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </RecoilRoot>
    </Provider>
  )
}

export default App