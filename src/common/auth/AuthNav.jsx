import React from 'react'
// import { useSelector } from 'react-redux'
// import LoadingComponent from '../ui/LoadingComponent'
import SignedInMenu from '../ui/Menus/SignedInMenu'
// import SignedOutMenu from '../ui/Menus/SignedOutMenu'

const AuthNav = ({auth}) => {
  // const auth = useSelector(state => state.firebase.auth)

  return (
    <>
      <SignedInMenu auth={auth} />
      {/* {!isLoaded(auth) ? (
        <LoadingComponent />
      ) : (
          isEmpty(auth)
            ? <SignedOutMenu />
            : <SignedInMenu auth={auth} />
        )} */}
    </>
  )
}

export default AuthNav
