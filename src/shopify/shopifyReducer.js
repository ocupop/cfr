import {
  LOAD_SHOPIFY,
  LOAD_CHANNEL,
  UPDATE_CHANNEL,
  FINISH_LOAD,
  SET_ACTIVE_CHANNEL,
  UPDATE_CHECKOUT,
  ADD_NOTE,
} from './shopifyConstants'
import { createReducer } from '../common/utils/reducerUtil'

const initialState = {
  CAD: {
    client: null,
    checkout: null,
    products: [],
    shop: null,
  },
  USD: {
    client: null,
    checkout: null,
    products: [],
    shop: null,
  },
  activeChannel: 'CAD',
  loading: true
}

export const loadShopify = (state, payload) => {
  const { activeChannel } = payload
  return { ...state, loading: true, activeChannel }
}

export const loadChannel = (state, payload) => {
  const { channelId, client, products, checkout, shop } = payload
  return { ...state, [channelId]: { ...state[channelId], client, products, checkout, shop } }
}
export const updateChannel = (state, payload) => {
  const { channelId, client, products, shop } = payload
  return { ...state, [channelId]: { ...state[channelId], client, products, shop } }
}

export const finishLoad = (state, payload) => {
  const { loading } = payload
  return { ...state, loading }
}

export const setActiveChannel = (state, payload) => {
  const { activeChannel } = payload
  return { ...state, activeChannel }
}

export const updateCheckout = (state, payload) => {
  const { checkout } = payload
  const { activeChannel } = state
  return { ...state, [activeChannel]: { ...state[activeChannel], checkout } }
}

export const addNote = (state, payload) => {
  const { note } = payload
  const { activeChannel, [activeChannel]: { checkout } } = state
  return { ...state, [activeChannel]: { ...state[activeChannel], checkout: { ...checkout, note } } }
}



export default createReducer(initialState, {
  [LOAD_SHOPIFY]: loadShopify,
  [LOAD_CHANNEL]: loadChannel,
  [UPDATE_CHANNEL]: updateChannel,
  [FINISH_LOAD]: finishLoad,
  [SET_ACTIVE_CHANNEL]: setActiveChannel,
  [UPDATE_CHECKOUT]: updateCheckout,
  [ADD_NOTE]: addNote,
})