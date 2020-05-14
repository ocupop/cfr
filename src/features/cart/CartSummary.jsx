import React from 'react'
// import PropTypes from 'prop-types'

const CartSummary = props => {
  return (
    <div className="nav-link">
      <i className="ri-shopping-cart-line"></i>
      <span className="ml-2 badge badge-pill badge-light">1</span>
    </div>
  )
}

CartSummary.propTypes = {

}

export default CartSummary
