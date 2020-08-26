import {
  LOAD_SHOPIFY,
  LOAD_CHANNEL,
  UPDATE_CHANNEL,
  FINISH_LOAD,
  SET_ACTIVE_CHANNEL,
  UPDATE_CHECKOUT,
  ADD_NOTE,
} from './shopifyConstants'

export const loadShopify = (activeChannel) => {
  return {
    type: LOAD_SHOPIFY,
    payload: {
      activeChannel
    }
  }
}

export const loadChannel = ({ channelId, client, products, shop, checkout }) => {
  return {
    type: LOAD_CHANNEL,
    payload: {
      channelId,
      client,
      products,
      shop,
      checkout
    }
  }
}

export const updateChannel = ({ channelId, client, products, shop }) => {
  return {
    type: UPDATE_CHANNEL,
    payload: {
      channelId,
      client,
      products,
      shop
    }
  }
}

export const finishLoad = () => {
  return {
    type: FINISH_LOAD,
    payload: { loading: false }
  }
}

export const updateCheckout = (checkout) => {
  return {
    type: UPDATE_CHECKOUT,
    payload: { checkout }
  }
}

export const addNote = (note) => {
  return {
    type: ADD_NOTE,
    payload: { note }
  }
}

export const setActiveChannel = (activeChannel) => {
  return {
    type: SET_ACTIVE_CHANNEL,
    payload: { activeChannel }
  }
}


