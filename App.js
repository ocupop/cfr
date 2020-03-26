/* eslint-disable react/prop-types */
import React from 'react'
import Layout from './src/containers/Layout'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'

const App = ({ element }) => {
  return (
    <Layout>{element}</Layout>
  )
}

export default App