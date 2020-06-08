import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Dropdown, NavItem, NavLink } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeStore, activeCheckout } from '../../state'
import CartSummaryItem from './CartSummaryItem'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const CartSummary = () => {
  const store = useRecoilValue(activeStore)
  const [checkout, setCheckout] = useRecoilState(activeCheckout)
  const [checkoutID, setCheckoutID] = useLocalStorage('cfr_cart', false)

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
        <Dropdown as={NavItem}>
          <Dropdown.Toggle as={NavLink}>
            <i className="ri-shopping-cart-line"></i>
            <span className="ml-2 badge badge-pill badge-light">{checkout.lineItems.length}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="cart-summary">
              <div className="p-3">
                <h5>Cart</h5>
                {checkout.lineItems.length > 0 ? (
                  checkout.lineItems.map(item => (
                    <div>
                      <CartSummaryItem key={`${item.id}`} item={item} />
                    </div>
                  ))
                ) : (
                    <p>Uh Oh! Your cart is empty...</p>
                  )}
              </div>
              <hr className="my-0" />
              <div className="p-3 text-center">
                <p className="text-uppercase font-family-base">
                  <small>Add $0.00 to receive free delivery</small>
                </p>
                <div className="progress">
                  {/* @TODO: Replace with progress bar component from React Bootstrap */}
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{
                      width: `50%`
                    }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"/>
                </div>
              </div>
              <hr className="my-0" />
              <div className="p-3 text-center">
                <a href="/cart" className="btn btn-success btn-block text-white text-uppercase font-family-base mb-0">
                  <small>Checkout</small>
                </a>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  )
}

CartSummary.propTypes = {}

export default CartSummary
