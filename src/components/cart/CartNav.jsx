import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'

const CartNav = () => {
  const checkout = useSelector(state => state.shopify.checkout)

  return (
    <Link to='/cart' className="text-inherit">
      <div className="d-flex align-items-center">
        <i className="ri-shopping-cart-fill"></i>
        <span className="ml-2 badge badge-pill badge-white">{checkout && checkout.lineItems.length}</span>
      </div>
    </Link>
  )
}

export default CartNav
