import {
  CREATE_CLIENT,
  SET_SHOP,
  SET_CURRENCY,
  SET_PRODUCTS,
  SET_PRODUCT,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
} from './shopifyConstants'


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

export const setShop = (shop) => {
  return {
    type: SET_SHOP,
    payload: {
      shop
    }
  }
}
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: {
      products
    }
  }
}
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    payload: {
      product
    }
  }
}

export const createCheckout = (checkout) => {
  return {
    type: CREATE_CHECKOUT,
    payload: {
      checkout
    }
  }
}
export const updateCheckout = (checkout) => {
  return {
    type: UPDATE_CHECKOUT,
    payload: {
      checkout
    }
  }
}
