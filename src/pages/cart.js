import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form } from 'formik'
// import FormikDebug from '../common/utils/FormikDebug'
import { TextInput } from '../common/fields'
import CartSummaryItem from '../components/cart/CartSummaryItem'
import LoadingComponent from '../common/ui/LoadingComponent'
import { updateCheckout } from '../shopify/shopifyActions'


const CartPage = () => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(state => state.shopify.activeChannel)
  const channel = useSelector(state => state.shopify[activeChannel])
  const { client, checkout } = channel

  const [freeShipping] = useState(400)
  const [progress, setProgress] = useState(0)


  async function addNote({ note }) {
    console.log(note)
    try {
      const newCheckout = await client.checkout.updateAttributes(checkout.id, { note: note })
      dispatch(updateCheckout(newCheckout))

      window.location.replace(newCheckout.webUrl)
    } catch (error) {
      console.log(error)
      toastr.error('Error', error)
    }
  }

  useEffect(() => {
    if (!checkout) {
      return
    }
    function getProgress(value) {
      const progress = Math.round((value / freeShipping) * 100)
      return progress > 100 ? 100 : progress
    }
    setProgress(getProgress(checkout.subtotalPrice))
  }, [checkout, freeShipping])

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
                {checkout.lineItems.length > 0 && checkout.lineItems.map(item => (
                  <CartSummaryItem
                    key={item.id}
                    item={item}
                    client={client}
                    checkout={checkout}
                  />
                ))}
                <hr className="border-darken" />
                {checkout.lineItems.length > 0 ? (
                  <>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        note: ''
                      }}
                      onSubmit={(values) => addNote(values)}>
                      {({ values, dirty }) => (
                        <Form className="p-3 bg-light text-dark">
                          <small>Please tell us a little bit about your snowmobile before you can checkout.</small>
                          <Field
                            name="note"
                            className="mt-3"
                            component={TextInput}
                            placeholder="Year / Make / Model"
                          />
                          <div className="text-center">
                            {dirty ? (
                              <button type="submit" className="btn btn-warning text-dark btn-block">Checkout Now</button>
                            ) : (
                                <button className="btn btn-dark btn-block" disabled>Checkout Now</button>
                              )}

                          </div>
                        </Form>
                      )}
                    </Formik>

                  </>
                ) : (
                    <p>Uh Oh! Your cart is empty...</p>
                  )}
              </div>
            </div>
            <div className="col-12 col-md-4 bg-dark bg-bleed text-white">
              <div className="px-3 pt-5 text-center">
                <h5>Total: ${checkout.subtotalPrice} {activeChannel}</h5>
                <hr className="border-lighten" />
                {progress === 100 ? (
                  <>
                    <p className="text-uppercase font-family-base">
                      <small>Congrats! You qualify for free shipping.</small><br />
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
                          <span className="btn btn-secondary btn-block text-white text-uppercase font-family-base align-items-center justify-content-center d-flex">
                            <i className="ri-shopping-cart-fill mr-2"></i>
                            <small>Continue Shopping...</small>
                          </span>
                        </Link>
                      </div>
                    </>
                  )}

              </div>
              <div className="px-3 pb-5">
                {/* <hr className="mt-0 border-lighten" /> */}
                <p className="font-family-base text-center">
                  <small>Apply any additional discount codes during checkout.</small>
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
