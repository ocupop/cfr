import React from 'react'
import { Provider } from 'react-redux'
import createStore from './src/store/createStore'
import ReduxToastr from 'react-redux-toastr'
import ModalWrapper from './src/common/modals/ModalWrapper'
import Layout from './src/containers/Layout'
import 'flag-icon-css/css/flag-icon.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'


const App = ({ element }) => {
  const store = createStore()
  return (
    <Provider store={store}>
      <ModalWrapper />
      <ReduxToastr
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
      <Layout>
        {element}
      </Layout>
    </Provider>
  )
}

export default App