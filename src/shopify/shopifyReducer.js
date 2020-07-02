import {
  SET_WHOLESALE,
  SET_CURRENCY,
  SET_SHOP,
  FETCH_PRODUCTS_BEGIN,
  SET_PRODUCTS,
  FETCH_PRODUCTS_FAIL,
  SET_PRODUCT_FILTER,
  SET_CHECKOUT,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
} from './shopifyConstants'
import { createReducer } from '../common/utils/reducerUtil'

const initialState = {
  wholesale: false,
  usdcheckout: null,
  cadcheckout: null,
}

export const setWholesale = (state, payload) => {
  const { wholesale } = payload
  return { ...state, wholesale }
}

export const setCurrency = (state, payload) => {
  const { currency } = payload
  return { ...state, currency }
}
export const setShop = (state, payload) => {
  const { shop } = payload
  return { ...state, shop }
}
export const fetchProductsBegin = (state) => {
  return { ...state }
}
export const setProducts = (state, payload) => {
  const { products, loading } = payload
  return { ...state, products, loading }
}
export const fetchProductsFail = (state, payload) => {
  const { error } = payload
  return { ...state, error }
}

export const setProductFilter = (state, payload) => {
  const { filter } = payload
  return { ...state, filter }
}
export const setCheckout = (state, payload) => {
  const { checkout } = payload
  return { ...state, checkout }
}

export const createCheckout = (state, payload) => {
  const { checkout } = payload
  return { ...state, checkout }
}
export const updateCheckout = (state, payload) => {
  const { checkout } = payload
  // if (state.currency === 'CAD') {
  //   return { ...state, checkout: checkout, cadcheckout: checkout }
  // }
  // return { ...state, checkout: checkout, usdcheckout: checkout }
  return { ...state, checkout }
}

export default createReducer(initialState, {
  [SET_WHOLESALE]: setWholesale,
  [SET_CURRENCY]: setCurrency,
  [SET_SHOP]: setShop,
  [FETCH_PRODUCTS_BEGIN]: fetchProductsBegin,
  [SET_PRODUCTS]: setProducts,
  [FETCH_PRODUCTS_FAIL]: fetchProductsFail,
  [SET_PRODUCT_FILTER]: setProductFilter,
  [SET_CHECKOUT]: setCheckout,
  [CREATE_CHECKOUT]: createCheckout,
  [UPDATE_CHECKOUT]: updateCheckout,
})