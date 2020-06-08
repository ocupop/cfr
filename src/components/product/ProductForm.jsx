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
import {
  // TextInput,
  // TextArea,
  NumberInput,
  // SelectInput
} from '../../common/fields'

const ProductForm = ({ props: { suggestedProducts, shopifyCanadaID, shopifyUSID } }) => {
  const productCAID = encodeID(shopifyCanadaID)
  const productUSID = encodeID(shopifyUSID)
  const [country] = useRecoilState(activeCountry)
  const [checkout, setCheckout] = useRecoilState(activeCheckout)
  const store = useRecoilValue(activeStore)


  const [product, setProduct] = useState()
  // const [variant, setVariant] = useState()
  // const [variantOptions, setVariantOptions] = useState({})

  const [available] = useState(false)


  // const handleOptionChange = ({ target: { name, value } }) => {
  //   console.log("Change options", name, value)
  //   setVariantOptions(options => ({ ...options, [name]: value }))
  // }
  const addToCart = async (values) => {
    console.log("Checking out... need to grab form values", values)
    // const newCheckout = await store.checkout.addLineItems(checkout.id, [])
    // console.log("New Checkout:", newCheckout)
    // setCheckout(newCheckout)
  }


  useEffect(() => {
    const storefrontID = country === 'CA' ? productCAID : productUSID
    store.product.fetch(storefrontID).then((product) => {
      setProduct(product)
    })

  }, [store.product, country, productCAID, productUSID])


  // useEffect(() => {
  //   async function getVariant() {
  //     const variant = await store.product.helpers.variantForOptions(product, variantOptions)
  //     setVariant(variant)
  //   }

  //   if (store && product) {
  //     getVariant()
  //   }

  // }, [product, variantOptions])

  // useEffect(() => {
  //   if (variant) {
  //     setAvailable(variant.available)
  //   }
  // }, [variant])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required')
  })
  const defaultValues = {
    variant: {
      variantId: '',
      quantity: 1
    }
  }
  const activeValues = false
  const initialValues = activeValues || defaultValues

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}>

      {({ values, setFieldValue }) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <Field
                name="variant"
                component={ProductVariant}
                product={product}
                onChange={value => console.log(value)}
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

          <button
            type="submit"
            className="btn btn-secondary mb-3 mb-lg-5">
            Add to Cart
          </button>

          <FormikDebug />
        </Form>
      )}
    </Formik>
  )
}

ProductForm.propTypes = {}

export default ProductForm
