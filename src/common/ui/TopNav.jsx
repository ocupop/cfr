import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'gatsby'
import AuthNav from '../auth/AuthNav'
import { openModal } from '../modals/modalActions'

const TopNav = () => {
  const dispatch = useDispatch()
  const checkout = useSelector(state => state.shopify.checkout)
  const currency = useSelector(state => state.shopify.currency)

  const auth = {
    displayName: 'tombeck',
    photoURL: ''
  }

  return (
    <div className="d-flex align-items-center">
      <div className="mr-3">
        <AuthNav auth={auth}/>
      </div>
      <Link to='/cart' className="text-inherit mr-2">
        <div className="d-flex align-items-center">
          <i className="ri-shopping-cart-fill"></i>
          <span className="ml-2 badge badge-pill badge-primary">{checkout && checkout.lineItems.length}</span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => dispatch(openModal('CountryModal', { currency: currency }))}
        className="btn mx-2">
        {currency === 'CAD' ? (
          <span className="text-dark">
            <i className="flag-icon flag-icon-ca mr-1"></i>
            <small>CAD</small>
          </span>
        ) : (
            <span className="text-dark">
              <i className="flag-icon flag-icon-us mr-1"></i>
              <small>USD</small>
            </span>
          )}
      </button>
    </div>

  )
}

export default TopNav
