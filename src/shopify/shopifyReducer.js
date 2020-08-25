import {
  LOAD_SHOPIFY,
  LOAD_CHANNEL,
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
  activeChannel: null
}

export const loadShopify = (state, payload) => {
  const { activeChannel } = payload
  return { ...state, loading: true, activeChannel }
}

export const loadChannel = (state, payload) => {
  const { id, client, products, checkout, shop } = payload
  return { ...state, [id]: { ...state[id], client, products, checkout, shop } }
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
  [FINISH_LOAD]: finishLoad,
  [SET_ACTIVE_CHANNEL]: setActiveChannel,
  [UPDATE_CHECKOUT]: updateCheckout,
  [ADD_NOTE]: addNote,
})