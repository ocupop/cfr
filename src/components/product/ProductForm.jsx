import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "@reach/router"
import { Loader } from 'semantic-ui-react'
// import FormikDebug from '../../common/utils/FormikDebug'
import { useSelector, useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Formik, Field, Form, FieldArray } from 'formik'

import ProductVariant from './ProductVariant'
import ProductSuggested from './ProductSuggested'
import ProductBug from './ProductBug'

import { updateCheckout } from '../../shopify/shopifyActions'

const ProductForm = ({ props: product }) => {
  const navigate = useNavigate()
  const { cadStorefrontID, usdStorefrontID, suggestedProducts } = product
  const dispatch = useDispatch()
  const activeChannel = useSelector(({ shopify }) => shopify.activeChannel)
  const channel = useSelector(state => state.shopify[activeChannel])
  const productID = activeChannel === 'CAD' ? cadStorefrontID : usdStorefrontID
  const { client, checkout, products } = channel
  const shopifyProduct = products[productID]

  if (!channel || !shopifyProduct) {
    return <Loader />
  }

  const addToCart = async (values, resetForm) => {
    const { lineItems } = values
    const validLineItems = lineItems.filter(item => item.quantity && item.variantId)
    try {
      const response = await client.checkout.addLineItems(checkout.id, validLineItems)
      dispatch(updateCheckout(response))
      toastr.success('Success', 'These items are in your cart now.')
      navigate(`/cart`, { replace: true })
    } catch (error) {
      console.log(error)
      toastr.error('Error', 'There was an issue updating your cart.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          lineItems: [{
            variantId: null,
            quantity: 0,
            customAttributes: [
              {
                key: 'title',
                value: ''
              }
            ]
          }]
        }}
        onSubmit={(values, {resetForm}) => addToCart(values, resetForm)}>

        {({ values }) => (
          <Form>
            <div className="row">
              <div className="col-12">
                <Field
                  name="lineItems[0]"
                  component={ProductVariant}
                  client={client}
                  shopifyProduct={products[productID]}
                  productName={product.name}
                />
              </div>
            </div>
            {values.lineItems[0].variantId && (
              <div className="row">
                <div className="col-12">
                  <div className="my-4">
                    <FieldArray name="lineItems">
                      {({ push, remove }) => (
                        <>
                          {suggestedProducts.map((product, index) => {
                            const id = activeChannel === 'CAD' ? product.cadStorefrontID : product.usdStorefrontID

                            if(!id) {
                              return <ProductBug key={`${index}`} product={product} message="Suggested Products"/>
                            }
                            return (
                              <Field
                                key={`${id}_${index}`}
                                name={`lineItems[${index + 1}]`}
                                component={ProductSuggested}
                                productName={product.name}
                                shopifyProduct={products[id]}
                                client={client}
                                featuredImage={product.featuredImage}
                              />
                            )
                          })}
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>
              </div>
            )}

            {values.lineItems[0] && (
              // TODO: Add logic to test that all fields are complete and there is availability
              <button
                type="submit"
                className="btn btn-secondary btn-large btn-block mb-3 mb-lg-5"
                disabled={!values.lineItems[0].variantId}>
                Add to Cart
              </button>
            )}
            {/* <FormikDebug /> */}
          </Form>
        )}
      </Formik>
    </>
  )
}

ProductForm.propTypes = {
  props: PropTypes.instanceOf(Object)
}

export default ProductForm
