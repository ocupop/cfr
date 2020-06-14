import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import asyncReducer from '../common/async/asyncReducer'
import modalReducer from '../common/modals/modalReducer'
import shopifyReducer from '../shopify/shopifyReducer'
// import testReducer from '../features/sandbox/testReducer'

const rootReducer = () => combineReducers({
  toastr: toastrReducer,
  async: asyncReducer,
  modals: modalReducer,
  shopify: shopifyReducer,
  // test: testReducer,

})

export default rootReducer
