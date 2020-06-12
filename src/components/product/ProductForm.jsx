/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Formik, Field, Form, FieldArray } from 'formik'
import FormikDebug from '../../common/utils/FormikDebug'
import ProductVariant from './ProductVariant'
import ProductSuggested from './ProductSuggested'
import { setProduct, updateCheckout } from '../../shopify/shopifyActions'

const ProductForm = ({ props: { suggestedProducts, cadStorefrontID, usdStorefrontID } }) => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.shopify.currency)
  const checkout = useSelector(state => state.shopify.checkout)
  const client = useSelector(state => state.shopify.client)
  const product = useSelector(state => state.shopify.product)
  const [available] = useState(false)
  const productID = currency === 'CAD' ? cadStorefrontID : usdStorefrontID

  const addToCart = async (values) => {
    const { product } = values
    try {
      const response = await client.checkout.addLineItems(checkout.id, product)
      dispatch(updateCheckout(response))
      toastr.success('Success', 'These items are in your cart now.')
    } catch (error) {
      toastr.error('Error', 'There was an issue updating your cart.')
    }
  }

  if (client) {
    // If the storefrontID is false then what do we do?
    client.product.fetch("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM3OTc1NTA1Nw==").then((product) => {
      // TODO: If the product doesn't exist then there is the possibility that the country needs to change.
      console.log(product)
      // dispatch(setProduct(product))
    })
  }



  // useEffect(() => {
  //   async function addProductDetails() {
  //     try {
  //       dispatch(setProduct())
  //       const productDetails = await client.product.fetch(productID)
  //       console.log("productDetails", productDetails)

  //       dispatch(setProduct(productDetails))
  //     } catch (error) {
  //       toastr.error('Uh oh', error.message)
  //     }
  //   }
  //   console.log(productID)
  //   addProductDetails()
  // }, [productID])


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
      onSubmit={(values) => console.log(values)}>

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
            <>
              <button
                type="submit"
                className="btn btn-secondary btn-large btn-block mb-3 mb-lg-5"
                onClick={() => addToCart(values)}>
                Add to Cart
              </button>
              <div className="row">
                <div className="col-12">
                  <div className="p-2 my-4">
                    {/* <FieldArray name="addOns" component={ProductVariant} /> */}
                    {suggestedProducts && suggestedProducts.map((product) => <ProductSuggested key={product.id} product={product} />)}
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <FormikDebug /> */}
        </Form>
      )}
    </Formik>
  )
}

ProductForm.propTypes = {}

export default ProductForm
