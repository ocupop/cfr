import React from 'react'
import { useSelector } from 'react-redux'
import LoadingComponent from '../common/ui/LoadingComponent'


const SandboxPage = () => {
  const checkout = useSelector(state => state.shopify.checkout)
  const currency = useSelector(state => state.shopify.currency)

  if (!checkout || !currency) {
    return <LoadingComponent />
  }

  return (
    <>
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="p-5">
                <h5>Sandbox</h5>
              </div>
            </div>
            <div className="col-12 col-md-4 bg-dark bg-bleed text-white">
              <div className="px-3 pt-5 text-center">
                <h5>State Summary:</h5>
                <hr />
                <p>
                  <strong>Currency:</strong> {currency}<br />
                  <strong>CheckoutId:</strong> {checkout.id}<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

SandboxPage.propTypes = {

}

export default SandboxPage
