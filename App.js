import React from 'react'
import { RecoilRoot } from 'recoil'

import Layout from './src/containers/Layout'
import 'flag-icon-css/css/flag-icon.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'

const App = ({ element }) => {
  return (
    <RecoilRoot>
      <Layout>
        {element}
      </Layout>
    </RecoilRoot>
  )
}

export default App