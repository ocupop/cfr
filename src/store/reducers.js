import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import locationReducer from './location'
import asyncReducer from '../common/async/asyncReducer'
import modalReducer from '../common/modals/modalReducer'
// import testReducer from '../features/sandbox/testReducer';

// import cartReducer from '../features/cart/cartReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  toastr: toastrReducer,
  location: locationReducer,
  async: asyncReducer,
  modals: modalReducer,
  // test: testReducer,
  // cart: cartReducer
})

export default rootReducer
