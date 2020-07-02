import {
  SET_WHOLESALE,
  SET_SHOP,
  SET_CURRENCY,
  FETCH_PRODUCTS_BEGIN,
  SET_PRODUCTS,
  FETCH_PRODUCTS_FAIL,
  SET_PRODUCT_FILTER,
  SET_CHECKOUT,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
} from './shopifyConstants'


export const setWholesale = (wholesale) => {
  return {
    type: SET_WHOLESALE,
    payload: {
      wholesale
    }
  }
}

export const setCurrency = (currency) => {
  return {
    type: SET_CURRENCY,
    payload: {
      currency
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

export const fetchProductsBegin = () => {
  return {
    type: FETCH_PRODUCTS_BEGIN,
    payload: {}
  }
}
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: {
      products,
      loading: false
    }
  }
}
export const fetchProductsFail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    payload: {
      error,
      loading: false
    }
  }
}

export const setProductFilter = (filter) => {
  return {
    type: SET_PRODUCT_FILTER,
    payload: {
      filter
    }
  }
}

export const setCheckout = (checkout) => {
  return {
    type: SET_CHECKOUT,
    payload: {
      checkout
    }
  }
}

// TODO: Necessary?
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
