import {
  SET_CURRENCY,
  CREATE_CLIENT,
  SET_SHOP,
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_PRODUCT_FILTER,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
  OPEN_CART,
  CLOSE_CART,
} from './shopifyConstants'
import { createReducer } from '../common/utils/reducerUtil'

const initialState = {
  currency: 'CAD',
  checkout: null,
  isCartOpen: false
}

export const setCurrency = (state, payload) => {
  const { currency } = payload
  return { ...state, currency }
}
export const createClient = (state, payload) => {
  const { client } = payload
  return { ...state, client }
}
export const createCheckout = (state, payload) => {
  const { checkout } = payload
  return { ...state, checkout }
}
export const updateCheckout = (state, payload) => {
  const { checkout } = payload
  return { ...state, checkout }
}
export const setShop = (state, payload) => {
  const { shop } = payload
  return { ...state, shop }
}
export const setProducts = (state, payload) => {
  const { products } = payload
  return { ...state, products }
}
export const setProduct = (state, payload) => {
  const { product } = payload
  return { ...state, product }
}
export const setProductFilter = (state, payload) => {
  const { filter } = payload
  return { ...state, filter }
}

export const closeCart = (state, payload) => {
  const { isCartOpen } = payload
  return { ...state, isCartOpen }
}

export const openCart = (state, payload) => {
  const { isCartOpen } = payload
  return { ...state, isCartOpen }
}


export default createReducer(initialState, {
  [SET_CURRENCY]: setCurrency,
  [CREATE_CLIENT]: createClient,
  [SET_SHOP]: setShop,
  [SET_PRODUCTS]: setProducts,
  [SET_PRODUCT]: setProduct,
  [SET_PRODUCT_FILTER]: setProductFilter,
  [CREATE_CHECKOUT]: createCheckout,
  [UPDATE_CHECKOUT]: updateCheckout,
  [OPEN_CART]: openCart,
  [CLOSE_CART]: closeCart,
})