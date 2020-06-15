import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import OptionSelector from './OptionSelector'
import { getPriceRange } from '../../common/utils/helpers'

const ProductVariant = ({ addOn, product, field, form: { errors, touched, setFieldValue } }) => {
  const { cadStorefrontID, usdStorefrontID, name } = product
  const [variant, setVariant] = useState()
  const [variantOptions, setVariantOptions] = useState(null)
  const [quantity] = useState(1)
  const currency = useSelector(state => state.shopify.currency)
  const client = useSelector(state => state.shopify.client)
  const productID = currency === 'CAD' ? cadStorefrontID : usdStorefrontID
  const shopifyProduct = useSelector(state => state.shopify.products[productID])

  const handleOptionChange = ({ target: { name, value } }) => {
    setVariantOptions(options => ({ ...options, [name]: value }))
  }

  useEffect(() => {
    async function addVariant() {
      if (!variantOptions) return null
      const addVariant = await client.product.helpers.variantForOptions(shopifyProduct, variantOptions)
      if(!addVariant) {
        setVariant(null)
        return
      }

      setVariant(addVariant)
    }

    addVariant()

  }, [variantOptions, client, quantity, shopifyProduct])

  useEffect(() => {
    if(variant) {
      const title = `${shopifyProduct.title} (${variant.title})`
      setFieldValue(`${field.name}.customAttributes[0].key`, 'title')
      setFieldValue(`${field.name}.customAttributes[0].value`, title)
      setFieldValue(`${field.name}.variantId`, variant.id)
      setFieldValue(`${field.name}.quantity`, quantity)
    }

    if(!variant) {
      setFieldValue(`${field.name}.customAttributes`, [])
      setFieldValue(`${field.name}.variantId`, null)
      setFieldValue(`${field.name}.quantity`, 0)
    }

  }, [variant, quantity, shopifyProduct, setFieldValue, field.name])

  return (
    <>
      {addOn && (
        <div
          className="d-flex align-items-center justify-content-between bg-light text-dark border border-dark">
          <div className="col-4 bg-white">
            <div className="bg-image aspect-4x3" />
          </div>
          <div className="col-1"><i className="ri-add-circle-line"></i></div>
          <div className="col-7"><small>Add {name}</small></div>
        </div>
      )}

      {!addOn && (
        <>
          {variant ? (
            <>
              <p className="lead">${variant.price}</p>
              <div
                className='bg-image bg-white aspect-4x3 mb-3'
                style={{ backgroundImage: `url(${variant.image.src})` }} />
            </>
          ) : (
              <>
                <p className="lead">{getPriceRange(shopifyProduct)}</p>
                <div
                  className='bg-image bg-white aspect-4x3 mb-3'
                  style={{ backgroundImage: `url(${shopifyProduct.images[0].src})` }} />
              </>
            )}
        </>
      )}

      {shopifyProduct && shopifyProduct.options &&
        shopifyProduct.options.map(option => {
          return (
            <OptionSelector
              key={`${option.id}`}
              option={option}
              onChange={handleOptionChange} />
          )
        })}

    </>
  )
}

ProductVariant.propTypes = {}

export default ProductVariant
