import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
import ReduxToastr from 'react-redux-toastr'
import ModalWrapper from './src/common/modals/ModalWrapper'
import Layout from './src/containers/Layout'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'flag-icon-css/css/flag-icon.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'


const App = ({ element }) => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <ModalWrapper />
      <Layout>
        {element}
      </Layout>
      <ReduxToastr
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </Provider>
  )
}

export default App