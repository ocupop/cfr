import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import asyncReducer from '../common/async/asyncReducer'
import modalReducer from '../common/modals/modalReducer'
// import testReducer from '../features/sandbox/testReducer';
// import cartReducer from '../features/cart/cartReducer';

const rootReducer = (history) => combineReducers({
  toastr: toastrReducer,
  async: asyncReducer,
  modals: modalReducer,
  // test: testReducer,
  // cart: cartReducer
})

export default rootReducer
