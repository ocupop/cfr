/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useRecoilState, useRecoilValue } from 'recoil'

import FormikDebug from '../../common/utils/FormikDebug'
import { activeCountry, activeStore, activeCheckout } from '../../state'
import { encodeID } from '../../common/helpers'
import ProductVariant from './ProductVariant'
// import ProductSuggested from './ProductSuggested'

const ProductForm = ({ props: { suggestedProducts, shopifyCanadaID, shopifyUSID } }) => {
  const productCAID = encodeID(shopifyCanadaID)
  const productUSID = encodeID(shopifyUSID)
  const [country] = useRecoilState(activeCountry)
  const [checkout] = useRecoilState(activeCheckout)
  const store = useRecoilValue(activeStore)

  const [product, setProduct] = useState()
  const [available, setAvailable] = useState(true)

  const addToCart = async (values) => {
    try {
      // console.log("Checking out... need to grab form values", values)
      await store.checkout.addLineItems(checkout.id, values.defaultVariant)
      // console.log("New Checkout:", newCheckout)
      console.log(await store.checkout.fetch(checkout.id))

    } catch (error) {
      console.log("Error:",error)
    }
  }

  useEffect(() => {
    const storefrontID = country === 'CA' ? productCAID : productUSID
    store.product.fetch(storefrontID).then((product) => {
      setProduct(product)
    })

  }, [store.product, country, productCAID, productUSID])

  const defaultValues = {
    defaultVariant: {
      variantId: '',
      quantity: 1
    },
    addOns: []
  }
  const activeValues = false
  const initialValues = activeValues || defaultValues

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => addToCart(values)}>

      {({ values, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <Field
                name="defaultVariant"
                component={ProductVariant}
                product={product}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="border-top border-bottom p-2 border-white my-4">
                {/* <FieldArray name="lineItems" component={ProductVariant} /> */}
                {/* {suggestedProducts && suggestedProducts.map((product) => <ProductSuggested key={product.id} product={product} />)} */}
              </div>
            </div>
          </div>

          {available && (
            <button
              type="submit"
              className="btn btn-secondary mb-3 mb-lg-5"
              onClick={() => addToCart(values)}>
              Add to Cart
            </button>
          )}


          {/* <FormikDebug /> */}
        </Form>
      )}
    </Formik>
  )
}

ProductForm.propTypes = {}

export default ProductForm
