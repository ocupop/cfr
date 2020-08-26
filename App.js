import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import configureStore from './src/store/configureStore'
import ReduxToastr from 'react-redux-toastr'
import ModalWrapper from './src/common/modals/ModalWrapper'
import Layout from './src/containers/Layout'
import LoadingComponent from './src/common/ui/LoadingComponent'
import 'flag-icon-css/css/flag-icon.css'
import 'semantic-ui-css/semantic.min.css'
import 'remixicon/fonts/remixicon.css'
import './content/_scss/main.scss'

const App = ({ element }) => {
  const store = configureStore()
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <ModalWrapper />
        <Layout>
          {element}
        </Layout>
        <ReduxToastr
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </PersistGate>
    </Provider>
  )
}

export default App