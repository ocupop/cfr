import {
  SET_CURRENCY,
  CREATE_CLIENT,
  SET_SHOP,
  SET_PRODUCTS,
  SET_PRODUCT,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
} from './shopifyConstants'
import { createReducer } from '../common/utils/reducerUtil'

const initialState = {
  currency: 'CAD',
  checkout: null,
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



export default createReducer(initialState, {
  [SET_CURRENCY]: setCurrency,
  [CREATE_CLIENT]: createClient,
  [SET_SHOP]: setShop,
  [SET_PRODUCTS]: setProducts,
  [SET_PRODUCT]: setProduct,
  [CREATE_CHECKOUT]: createCheckout,
  [UPDATE_CHECKOUT]: updateCheckout,
})