import React from 'react'
import { RecoilRoot, useTransactionObservation_UNSTABLE } from 'recoil'
import Layout from './src/containers/Layout'
import 'flag-icon-css/css/flag-icon.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'
import {
  activeCurrency,
  activeCheckout,
} from './src/shopify'

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


const App = ({ element }) => {

  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      <Layout>
        {element}
      </Layout>
    </RecoilRoot>
  )
}

export default App