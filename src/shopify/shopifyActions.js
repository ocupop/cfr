import {
  SET_CURRENCY,
  CREATE_CLIENT,
  USD_CLIENT,
  CAD_CLIENT,
  FETCH_PRODUCTS,
  FETCH_CHECKOUT,
  GET_SHOP,
  SET_ACTIVE_PRODUCT
} from './shopifyConstants';

export const setCurrency = (currency) => {
  return {
    type: SET_CURRENCY,
    payload: {
      currency
    }
  }
}
export const createClient = (client) => {
  return {
    type: CREATE_CLIENT,
    payload: {
      client
    }
  }
}
export const usdClient = (usStore) => {
  return {
    type: USD_CLIENT,
    payload: {
      usStore
    }
  }
}
export const cadClient = (canadianStore) => {
  return {
    type: CAD_CLIENT,
    payload: {
      canadianStore
    }
  }
}

export const fetchProducts = (products) => {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      products
    }
  }
}
export const fetchCheckout = (checkout) => {
  return {
    type: FETCH_CHECKOUT,
    payload: {
      checkout
    }
  }
}
export const getShop = (shop) => {
  return {
    type: GET_SHOP,
    payload: {
      shop
    }
  }
}
export const setActiveProduct = (product) => {
  return {
    type: SET_ACTIVE_PRODUCT,
    payload: {
      product
    }
  }
}