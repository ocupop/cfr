import { userReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case CANADIAN_STORE:
      return { ...state, country: 'CAN' }

    case US_STORE:
      return { ...state, country: 'USA' }

    default: {
      return state
    }
  }
}

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    country: 'CAN'
  })

  return { globalState, globalDispatch }
}

export default useGlobalState