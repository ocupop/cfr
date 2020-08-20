import React from 'react'
import { Provider } from 'react-redux'
// import configureStore from './src/store/configureStore'
import ReduxToastr from 'react-redux-toastr'
import ModalWrapper from './src/common/modals/ModalWrapper'
import Layout from './src/containers/Layout'
import 'flag-icon-css/css/flag-icon.css'
import 'semantic-ui-css/semantic.min.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'
// import { fetchProductsBegin } from './src/shopify/shopifyActions'


const App = ({ element, store }) => {
  // const store = configureStore()

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