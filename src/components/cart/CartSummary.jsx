import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { activeStore, activeCheckout } from '../../state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const CartSummary = () => {
  const store = useRecoilValue(activeStore)
  const [checkout, setCheckout] = useRecoilState(activeCheckout)
  const [checkoutID, setCheckoutID] = useLocalStorage('cfr_cart', false);

  useEffect(() => {
    // TODO: Add Try/Catch error handling
    async function getActiveCheckout(store) {
      // If checkout id exists in local storage then fetch, otherwise create a new checkout.
      const checkout = checkoutID
        ? await store.checkout.fetch(checkoutID)
        : await store.checkout.create()

      console.log("Checkout",checkout)
      setCheckout(checkout)
      setCheckoutID(checkout.id)
    }

    if (store) {
      getActiveCheckout(store)
    }

  }, [store])

  return (
    <>
      {checkout && (
        <div className="nav-link">
          <i className="ri-shopping-cart-line"></i>
          <span className="ml-2 badge badge-pill badge-light">{checkout.lineItems.length}</span>
        </div>
      )}
    </>
  )
}

CartSummary.propTypes = {}

export default CartSummary
