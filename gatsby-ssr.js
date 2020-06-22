/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import App from "./App"
import React from 'react'

export const wrapRootElement = () => {
  if (process.env.NODE_ENV !== `production`) {
    return null
  }
  return App
}

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="lsInitScript"
      id="lsInitScript"
      src="https://livesupporti.com/Scripts/clientAsync.js?acc=848b298c-f82a-4868-a975-2cd8aae81c0b&skin=Classic"
      defer
    />
  ])
}
