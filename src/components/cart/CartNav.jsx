import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openCart } from '../../shopify/shopifyActions'

const CartNav = () => {
  const dispatch = useDispatch()
  const checkout = useSelector(state => state.shopify.checkout)
  // const currency = useSelector(state => state.shopify.currency)
  return (
    <div
      onClick={() => dispatch(openCart())}>
      <i className="ri-shopping-cart-line"></i>
      <span className="ml-2 badge badge-pill badge-light">{checkout.lineItems.length}</span>
    </div>
  )
}

export default CartNav
