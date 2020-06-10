/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray } from 'formik'
import { useRecoilState, useRecoilValue } from 'recoil'
import FormikDebug from '../../common/utils/FormikDebug'
import { activeCurrency, activeStore, activeCheckout } from '../../store/recoil'
import { encodeID } from '../../common/utils/helpers'
import ProductVariant from './ProductVariant'
import ProductSuggested from './ProductSuggested'

const ProductForm = ({ props: { suggestedProducts, shopifyCanadaID, shopifyUSID } }) => {
  const productCAID = encodeID(shopifyCanadaID)
  const productUSID = encodeID(shopifyUSID)
  const [currency] = useRecoilState(activeCurrency)
  const [checkout] = useRecoilState(activeCheckout)
  const store = useRecoilValue(activeStore)

  const [product, setProduct] = useState()
  const [available] = useState(false)

  const addToCart = async (values) => {
    try {
      // console.log("Checking out... need to grab form values", values)
      console.log("Adding to checkout:", checkout.id, values)
      const response = await store.checkout.addLineItems(checkout.id, values.defaultVariant)
      console.log(response)
    } catch (error) {
      console.log("Error:",error)
    }
  }

  useEffect(() => {
    const storefrontID = currency === 'CAD' ? productCAID : productUSID
    store.product.fetch(storefrontID).then((product) => {
      setProduct(product)
    })

  }, [store.product, currency, productCAID, productUSID])

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
