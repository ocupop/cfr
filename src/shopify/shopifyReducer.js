import {
  SET_CURRENCY,
  CREATE_CLIENT,
  USD_CLIENT,
  CAD_CLIENT,
  FETCH_PRODUCTS,
  FETCH_CHECKOUT
} from './shopifyConstants'
import { createReducer } from '../common/utils/reducerUtil'

const initialState = {
  currency: 'CAD',
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {}
}
export const setCurrency = (state, payload) => {
  const { currency } = payload
  return { ...state, currency }
}
export const createClient = (state, payload) => {
  const { client } = payload
  return { ...state, client }
}
export const cadClient = (state, payload) => {
  const { canadianStore } = payload
  return { ...state, canadianStore }
}
export const usdClient = (state, payload) => {
  const { usStore } = payload
  return { ...state, usStore }
}
export const fetchProducts = (state, payload) => {
  const { products } = payload
  return { ...state, products }
}
export const fetchCheckout = (state, payload) => {
  const { checkout } = payload
  return { ...state, checkout }
}


export default createReducer(initialState, {
  [SET_CURRENCY]: setCurrency,
  [CREATE_CLIENT]: createClient,
  [CAD_CLIENT]: cadClient,
  [USD_CLIENT]: usdClient,
  [FETCH_PRODUCTS]: fetchProducts,
  [FETCH_CHECKOUT]: fetchCheckout,
})