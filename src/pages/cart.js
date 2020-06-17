import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { useSelector } from 'react-redux'
import CartSummaryItem from '../components/cart/CartSummaryItem'
import LoadingComponent from '../common/ui/LoadingComponent'


const CartPage = () => {
  const checkout = useSelector(state => state.shopify.checkout)
  const currency = useSelector(state => state.shopify.currency)
  const [freeShipping, setFreeShipping] = useState(400)
  const [progress, setProgress] = useState(0)

  function getProgress(value) {
    const progress = Math.round((value / freeShipping) * 100)

    return progress > 100 ? 100 : progress
  }

  useEffect(() => {
    setProgress(getProgress(checkout.subtotalPrice))
  }, [checkout])

  if (!checkout) {
    return <LoadingComponent />
  }

  return (
    <>
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="p-5">
                <h5>Cart Summary</h5>
                {checkout.lineItems.length > 0 && checkout.lineItems.map(item => <CartSummaryItem key={item.id} item={item} />)}
                <hr />
                {checkout.lineItems.length > 0 ? (
                  <div className="d-flex py-3">
                    <a href={checkout.webUrl} className="btn btn-secondary text-white text-uppercase font-family-base mb-0">
                      <small>Checkout now</small>
                    </a>
                    <a href={`/`} className="btn btn-light text-mid text-uppercase font-family-base ml-auto">
                      <small>Continue shopping</small>
                    </a>
                  </div>
                ) : (
                    <p>Uh Oh! Your cart is empty...</p>
                  )}
              </div>
            </div>
            <div className="col-12 col-md-4 bg-dark bg-bleed text-white">
              <div className="px-3 py-5 text-center">
                <h5>Total: ${checkout.subtotalPrice} {currency}</h5>
                <hr />
                {progress === 100 ? (
                  <>
                    <p className="text-uppercase font-family-base">
                      <small>Congrats! You qualify for free shipping.</small>
                    </p>
                  </>
                ) : (
                    <>
                      <p className="text-uppercase font-family-base">
                        <small>Add <strong>${Math.ceil(freeShipping - checkout.subtotalPrice)}</strong> to qualify for free shipping</small>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          style={{
                            width: `${progress}%`
                          }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100" />
                      </div>
                      <div className="py-3 text-center">
                        <Link to='/'>
                          <span className="btn btn-success btn-block text-white text-uppercase font-family-base align-items-center justify-content-center d-flex">
                            <i className="ri-shopping-cart-fill mr-2"></i>
                            <small>Continue Shopping...</small>
                          </span>
                        </Link>
                      </div>
                    </>
                  )}

              </div>
              <div className="px-3">
                <hr className="mt-0" />
                <p className="font-family-base text-center">
                  <small>Apply any additional discount codes in next step.</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

CartPage.propTypes = {

}

export default CartPage
