/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray } from 'formik'
import FormikDebug from '../../common/utils/FormikDebug'
import { encodeID } from '../../common/utils/helpers'
import ProductVariant from './ProductVariant'
import ProductSuggested from './ProductSuggested'
import { setActiveProduct } from '../../shopify/shopifyActions'

const ProductForm = ({ props: { suggestedProducts, shopifyCanadaID, shopifyUSID } }) => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.shopify.currency)
  const checkout = useSelector(state => state.shopify.checkout)
  const client = useSelector(state => state.shopify.client)
  const product = useSelector(state => state.shopify.product)

  const productCAID = encodeID(shopifyCanadaID)
  const productUSID = encodeID(shopifyUSID)

  const [available] = useState(false)

  const addToCart = async (values) => {
    try {
      // console.log("Checking out... need to grab form values", values)
      console.log("Adding to checkout:", checkout.id, values)
      const response = await client.checkout.addLineItems(checkout.id, values.defaultVariant)
      console.log(response)
    } catch (error) {
      console.log("Error:",error)
    }
  }

  useEffect(() => {
    const storefrontID = currency === 'CAD' ? productCAID : productUSID
    client.product.fetch(storefrontID).then((product) => {
      dispatch(setActiveProduct(product))
    })

  }, [currency, productCAID, productUSID])

  const defaultValues = {
    product: null,
    addOns: []
  }
  const activeValues = false
  const initialValues = activeValues || defaultValues

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => addToCart(values)}>

      {({ values }) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <Field
                name="product"
                component={ProductVariant}
                product={product}
              />
            </div>
          </div>

          {values.product && (
            <div className="row">
              <div className="col-12">
                <div className="p-2 my-4">
                  {/* <FieldArray name="addOns" component={ProductVariant} /> */}
                  {suggestedProducts && suggestedProducts.map((product) => <ProductSuggested key={product.id} product={product} />)}
                </div>
              </div>
            </div>
          )}

          {values.product && (
            <button
              type="submit"
              className="btn btn-secondary btn-large btn-block mb-3 mb-lg-5"
              onClick={() => addToCart(values)}>
              Add to Cart
            </button>
          )}
          <FormikDebug />
        </Form>
      )}
    </Formik>
  )
}

ProductForm.propTypes = {}

export default ProductForm
