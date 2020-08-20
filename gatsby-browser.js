/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import App from "./App"
import configureStore from './src/store/configureStore'

export const wrapRootElement = ({ element }) => {
  const store = configureStore()

  return (
    <App store={store} element={element} />
  )
}