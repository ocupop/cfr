/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { useRecoilValue } from 'recoil'
import { activeStore } from '../../state'
import OptionSelector from './OptionSelector'
import { NumberInput } from '../../common/fields'
const ProductVariant = ({ product, lineItems, field, form: { errors, touched, setFieldValue, values }  }) => {
  const store = useRecoilValue(activeStore)

  const [variant, setVariant] = useState()
  const [variantOptions, setVariantOptions] = useState({})
  const [available, setAvailable] = useState(false)


  const handleOptionChange = ({ target: { name, value } }) => {
    console.log("Change options", name, value)
    setVariantOptions(options => ({ ...options, [name]: value }))
  }

  useEffect(() => {
    async function getVariant() {
      const variant = await store.product.helpers.variantForOptions(product, variantOptions)
      setVariant(variant)
    }

    if (store && product) {
      getVariant()
    }

  }, [variantOptions])

  useEffect(() => {
    if (variant) {
      setAvailable(variant.available)
    }
  }, [variant])

  useEffect(() => {
    if (available) {
      setFieldValue(`${field.name}.variantId`, variant.id)
    }
  }, [available])



  if (!store || !product) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      {variant && (
        <>
          <p className="lead mt-3">${variant.price}</p>
          <div
            className='bg-image aspect-4x3 mb-3'
            style={{ backgroundImage: `url(${variant.image.src})` }} />
        </>
      )}
      {product && product.variants.length > 1
        ? product.options.map(option => {
          return (
            <OptionSelector
              key={`${option.id}`}
              option={option}
              onChange={handleOptionChange} />
          )
        }) : <span>Choose Your Options</span>}

      {available ? (
        <Field
          name={`${field.name}.quantity`}
          type="number"
          component={NumberInput}
          onChange={value => setFieldValue(`${field.name}.quantity`, value/1)}
          maskOptions={{
            includeThousandsSeparator: false,
            allowDecimal: false,
            requireDecimal: false
          }}
          label="Quantity"
        />
      ):(
        <div className="lead my-5 btn btn-dark btn-block btn-disabled">
          <i className="ri-arrow-up-line mr-2"></i>
          <span>Select Options &amp; Quantity</span>
        </div>
      )}
    </>
  )
}

ProductVariant.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductVariant
