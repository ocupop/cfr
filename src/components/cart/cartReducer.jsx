import { createReducer } from '../utils/reducerUtil';
import {
  CLIENT_CREATED,
  PRODUCTS_FOUND,
  CHECKOUT_FOUND,
  SHOP_FOUND,
  ADD_VARIANT_TO_CART,
  UPDATE_QUANTITY_IN_CART,
  REMOVE_LINE_ITEM_IN_CART,
  OPEN_CART,
  CLOSE_CART,
} from './cartConstants';

// initial state
const initState = {
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {}
}

export const openCart = (state, payload) => {
  return { ...state, loading: true }
}
export const closeCart = (state, payload) => {
  return { ...state, loading: true }
}


export default createReducer(initialState, {
  [OPEN_CART]: openCart,
  [CLOSE_CART]: closeCart,
})



// reducer



export default (state = initState, action) => {
  switch (action.type) {
    case CLIENT_CREATED:
      return { ...state, client: action.payload }
    case PRODUCTS_FOUND:
      return { ...state, products: action.payload }
    case CHECKOUT_FOUND:
      return { ...state, checkout: action.payload }
    case SHOP_FOUND:
      return { ...state, shop: action.payload }
    case ADD_VARIANT_TO_CART:
      return { ...state, isCartOpen: action.payload.isCartOpen, checkout: action.payload.checkout }
    case UPDATE_QUANTITY_IN_CART:
      return { ...state, checkout: action.payload.checkout }
    case REMOVE_LINE_ITEM_IN_CART:
      return { ...state, checkout: action.payload.checkout }
    case OPEN_CART:
      return { ...state, isCartOpen: true }
    case CLOSE_CART:
      return { ...state, isCartOpen: false }
    default:
      return state
  }
}