import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openCart } from '../../shopify/shopifyActions'
import { Link } from 'gatsby'

const CartNav = () => {
  const dispatch = useDispatch()
  const checkout = useSelector(state => state.shopify.checkout)
  // const currency = useSelector(state => state.shopify.currency)
  return (
    <Link to='/cart' className="text-info">
      <div className="d-flex align-items-center">
        <i className="ri-shopping-cart-fill"></i>
        <span className="ml-2 badge badge-pill badge-info">{checkout.lineItems.length}</span>
      </div>
    </Link>
  )
}

export default CartNav
