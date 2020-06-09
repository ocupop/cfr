import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Dropdown, NavItem, NavLink } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeStore, activeCheckout, activeCurrency } from '../../shopify'
import CartSummaryItem from './CartSummaryItem'

const CartSummary = () => {
  const store = useRecoilValue(activeStore)
  const [checkout, setCheckout] = useRecoilState(activeCheckout)
  const [currency] = useRecoilState(activeCurrency)

  useEffect(() => {
    // console.log("CHECKOUT:", checkout)
    async function updateCheckout() {
      console.log("Creating a new checkout")
      const newCheckout = await store.checkout.create()
      setCheckout(newCheckout)
    }
    if(!checkout) {
      updateCheckout()
    }

    if (checkout && checkout.currencyCode !== currency) {
      // save this checkout and grab a new one
      updateCheckout()

    }

  }, [currency])

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
                  checkout.lineItems.map((item, key) => {
                    return (
                      <div>
                        <CartSummaryItem key={`${item.id}_${key}`} item={item} />
                      </div>
                    )
                  })
                ) : (
                    <p>Uh Oh! Your cart is empty...</p>
                  )}
              </div>
              <hr className="my-0" />

              {/* <div className="p-3 text-center">
                <p className="text-uppercase font-family-base">
                  <small>Add $0.00 to receive free delivery</small>
                </p>
                <div className="progress">

                  <div
                    className="progress-bar bg-info"
                    style={{
                      width: `50%`
                    }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"/>
                </div>
              </div> */}

              <hr className="my-0" />
              {checkout.lineItems.length > 1 ? (
                <div className="p-3 text-center">
                  <a href="/cart" className="btn btn-success btn-block text-white text-uppercase font-family-base mb-0">
                    <small>Checkout</small>
                  </a>
                </div>
              ): (
                <div className="p-3 text-center">
                  <span className="btn btn-success btn-block text-white text-uppercase font-family-base mb-0">
                    <small>Continue Shopping...</small>
                  </span>
                </div>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  )
}

CartSummary.propTypes = {}

export default CartSummary
