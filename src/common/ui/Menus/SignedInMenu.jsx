import React from 'react'
import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux'
// import { logout } from '../../auth/authActions'
// import { openModal } from '../../modals/modalActions'

const SignedInMenu = ({ auth: { displayName, photoURL } }) => {
  // const dispatch = useDispatch()

  return (
    <>
      <div className="btn-group d-none">
        <button className="dropdown-toggle bg-transparent text-white border-0 p-0 d-flex align-items-center mr-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {photoURL ? (
            <img src={photoURL} className="img-avatar" alt={displayName} />
          ) : (
              <i className="ri-user-fill mr-2" />
            )}
          <span>{displayName}</span>
        </button>
        <div className="dropdown-menu bg-white shadow-sm">
          <a className="dropdown-item text-mid" href="/profile">Profile</a>
          <a className="dropdown-item text-mid" href="/orders">Orders</a>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item text-mid">Logout</button>
        </div>
      </div>
    </>
  )
}

SignedInMenu.propTypes = {
  auth: PropTypes.instanceOf(Object)
}

export default SignedInMenu
