import { createTransform } from 'redux-persist';

// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state')
//     if (serializedState === null) {
//       return undefined
//     }

//     return JSON.parse(serializedState)

//   } catch (error) {
//     return undefined
//   }
// }

// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch (error) {
//     console.log(error)
//   }
// }

export const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    return { ...inboundState, mySet: [...inboundState.mySet] };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['shopify'] }
)

export const ShopifyTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    return { ...inboundState };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // console.log(outboundState, key)
    // const { loading } = outboundState

    return { ...outboundState }
  },
  // define which reducers this transform gets called for.
  { whitelist: ['shopify'] }
)

