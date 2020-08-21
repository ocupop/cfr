/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../common/modals/modalActions'
import OptionSelector from './OptionSelector'
import { getPriceRange } from '../../common/utils/helpers'
import ProductBug from './ProductBug'


const ProductVariant = ({ addOn, chooseOptions, product, field, form: { errors, touched, setFieldValue } }) => {
  const dispatch = useDispatch()
  const { cadStorefrontID, usdStorefrontID, name } = product
  const [variant, setVariant] = useState()
  const [variantOptions, setVariantOptions] = useState(null)
  const [quantity] = useState(1)
  const [showOptions, setShowOptions] = useState(chooseOptions)
  const currency = useSelector(state => state.shopify.currency)
  const client = useSelector(state => state.shopify.client)
  const productID = currency === 'CAD' ? cadStorefrontID : usdStorefrontID
  const shopifyProduct = useSelector(state => state.shopify.products && state.shopify.products[productID])


  const handleOptionChange = ({ target: { name, value } }) => {
    setVariantOptions(options => ({ ...options, [name]: value }))
  }

  useEffect(() => {
    async function addVariant() {
      if (!variantOptions) return null
      try {
        const addVariant = await client.product.helpers.variantForOptions(shopifyProduct, variantOptions)
        if (!addVariant) {
          setVariant(null)
          return
        }
        setVariant(addVariant)
      } catch (error) {
        console.log(error)
      }

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
      setShowOptions(chooseOptions)
    }

    if(!variant) {
      setFieldValue(`${field.name}.customAttributes`, [])
      setFieldValue(`${field.name}.variantId`, null)
      setFieldValue(`${field.name}.quantity`, 0)
    }

  }, [variant, quantity, shopifyProduct, setFieldValue, field.name, chooseOptions])


  function handleSelect() {
    console.log(shopifyProduct)
    if (shopifyProduct.variants.length === 1) {
      setVariant(shopifyProduct.variants[0])
    }
    if (shopifyProduct.variants.length > 1) {
      setShowOptions(true)
    }
  }

  if (!shopifyProduct) {
    // TODO: Need a test to catch if the ID exists in the other store

    // console.log("Currency:", currency)
    // console.log("No Product Found: ", productID)
    return (
      <ProductBug
        product={product}
        message={`No Shopify product found in ${currency === 'CAD' ? 'the Candadian' : 'the US'} store`} />
    )
  }

  return (
    <>
      {addOn && (
        <>
          {variant ? (
            <div className="addOn active">
              <button
                type="button"
                onClick={() => setVariant(null)}
                className="actions">
                <i className="ri-close-circle-fill lead"></i>
              </button>
              <div className="col-4 bg-white">
                <div
                  className='bg-image aspect-4x3'
                  style={{ backgroundImage: `url(${variant.image.src})` }}
                  onClick={() => dispatch(openModal('ImageModal', {image: variant.image.src}))}/>
              </div>
              <div className="col-8">
                <small>
                  {variant.title === 'Default Title' ? '': variant.title } {name}
                </small>
              </div>
            </div>
          ):(
            <div className="addOn" onClick={() => handleSelect()}>
              <div className="col-4 bg-white">
                <div
                  className='bg-image bg-white aspect-4x3'
                  style={{ backgroundImage: `url(${product.featuredImage})` }}
                  onClick={() => dispatch(openModal('ImageModal', { image: product.featuredImage }))} />
              </div>
              <div className="col-1"><i className="ri-shopping-cart-fill"></i></div>
              <div className="col-7"><small>Add {name}</small></div>
            </div>
          )}
        </>
      )}

      {shopifyProduct && !addOn &&  (
        <>
          {variant ? (
            <>
              <p className="lead">${variant.price}</p>
              <div
                className='bg-image bg-white aspect-4x3 mb-3 bg-contain'
                style={{ backgroundImage: `url(${variant.image.src})` }}
                onClick={() => dispatch(openModal('ImageModal', { image: variant.image.src }))} />
            </>
          ) : (
              <>
                <p className="lead">{getPriceRange(shopifyProduct)}</p>
                <div
                  className='bg-image bg-white aspect-4x3 mb-3 bg-contain'
                  style={{ backgroundImage: `url(${shopifyProduct.images[0].src})` }}
                  onClick={() => dispatch(openModal('ImageModal', { image: shopifyProduct.images[0].src }))} />
              </>
            )}
        </>
      )}

      {shopifyProduct && shopifyProduct.options && showOptions &&
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
