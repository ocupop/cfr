import React from 'react'
import PropTypes from 'prop-types'
// import FormikDebug from '../../common/utils/FormikDebug'
import { useSelector, useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Formik, Field, Form, FieldArray } from 'formik'
import ProductVariant from './ProductVariant'
import { updateCheckout } from '../../shopify/shopifyActions'

const ProductForm = ({ props: product }) => {
  const { suggestedProducts } = product
  const dispatch = useDispatch()
  const currency = useSelector(state => state.shopify.currency)
  const checkout = useSelector(state => state.shopify.checkout)
  const client = useSelector(state => state.shopify.client)

  const addToCart = async (values) => {
    const { lineItems } = values
    const validLineItems = lineItems.filter(item => item.quantity && item.variantId)
    try {
      const response = await client.checkout.addLineItems(checkout.id, validLineItems)
      console.log(response)
      dispatch(updateCheckout(response))
      toastr.success('Success', 'These items are in your cart now.')
    } catch (error) {
      console.log(error)
      toastr.error('Error', 'There was an issue updating your cart.')
    }
  }


  return (
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
      onSubmit={(values) => addToCart(values)}>

      {({ values }) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <Field
                name="lineItems[0]"
                component={ProductVariant}
                product={product}
                addOn={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="p-2 my-4">
                <FieldArray name="lineItems">
                  {({push, remove}) => (
                    <>
                      {suggestedProducts.map((product, index) => {

                        const id = currency === 'CAD' ? product.cadStorefrontID : product.usdStorefrontID
                        return (
                          <Field
                            key={`${id}_${index}`}
                            name={`lineItems[${index + 1}]`}
                            component={ProductVariant}
                            product={product}
                            addOn={true}
                          />
                        )
                      })}
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          {values.lineItems[0] && (
            <button
              type="submit"
              className="btn btn-primary btn-large btn-block mb-3 mb-lg-5"
              disabled={!values.lineItems[0].variantId}>
              Add to Cart
            </button>
          )}
          {/* <FormikDebug /> */}
        </Form>
      )}
    </Formik>
  )
}

ProductForm.propTypes = {
  props: PropTypes.instanceOf(Object)
}

export default ProductForm
