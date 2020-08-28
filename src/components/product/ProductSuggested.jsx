/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../../common/modals/modalActions'
import OptionSelector from './OptionSelector'


const ProductSuggested = ({ client, productName, shopifyProduct, featuredImage, field, form: { errors, touched, setFieldValue } }) => {
  const { options, variants } = shopifyProduct
  const dispatch = useDispatch()
  const [showOptions, setShowOptions] = useState()
  const [selectedVariant, setSelectedVariant] = useState()
  const [variantOptions, setVariantOptions] = useState(null)
  // const [quantity, setQuantity] = useState(0)

  const handleOptionChange = ({ target: { name, value } }) => {
    setVariantOptions(options => ({ ...options, [name]: value }))
  }

  useEffect(() => {
    async function addVariant() {
      if (!variantOptions) return null
      try {
        const addVariant = await client.product.helpers.variantForOptions(shopifyProduct, variantOptions)
        if (!addVariant) {
          setSelectedVariant(null)
          return
        }
        setSelectedVariant(addVariant)
      } catch (error) {
        console.log(error)
      }

    }

    addVariant()

  }, [variantOptions])


  useEffect(() => {
    if (selectedVariant) {
      const title = `${productName} (${selectedVariant.title})`
      setFieldValue(`${field.name}.customAttributes[0].key`, 'title')
      setFieldValue(`${field.name}.customAttributes[0].value`, title)
      setFieldValue(`${field.name}.variantId`, selectedVariant.id)
      setFieldValue(`${field.name}.quantity`, 1)
    }

    if (!selectedVariant) {
      setFieldValue(`${field.name}.customAttributes`, [])
      setFieldValue(`${field.name}.variantId`, null)
      setFieldValue(`${field.name}.quantity`, 0)
    }

  }, [selectedVariant])


  function handleSelect() {
    if (variants.length === 1) {
      setSelectedVariant(variants[0])
    }
    if (variants.length > 1) {
      setShowOptions(true)
    }
  }


  return (
    <>
      <div
        className={selectedVariant ? "addOn active":"addOn"}
        onClick={() => {
          if(!selectedVariant) handleSelect()
        }}
      >
        <div className="col-2 bg-white">
          {selectedVariant ? (
            <div
              className='bg-image aspect-4x3'
              style={{ backgroundImage: `url(${selectedVariant.image.src})` }}
              onClick={() => dispatch(openModal('ImageModal', { image: selectedVariant.image.src }))} />
          ):(
              <div
                className='bg-image bg-white aspect-4x3'
                style={{ backgroundImage: `url(${featuredImage})` }}
                onClick={() => dispatch(openModal('ImageModal', { image: featuredImage }))} />
          )}
        </div>
        <div className="col-10">
          <div className="d-flex align-items-stretch justify-content-between h-100">

            {field.value && field.value.quantity > 0 ? (
              <>
                <div className="bg-dark p-1 align-self-stretch align-items-center d-flex p-2 pt-3">
                  <div className="badge badge-dark">{field.value.quantity}</div>
                </div>
                <div className="d-flex align-items-center flex-fill">
                  <small className="my-auto mx-2">{productName}&nbsp;{selectedVariant.price}</small>
                </div>
              </>
            ):(
              <>
                <div className="bg-transparent p-1 align-self-center">
                  <i className="ri-shopping-cart-fill ml-3"/>
                </div>
                <div className="d-flex align-items-center flex-fill">
                  <small className="my-auto mx-2">Add {productName}</small>
                </div>
              </>
            )}

            <div className="actions d-flex align-items-center">

              {selectedVariant && (
                <>
                  {field.value.quantity > 0 && (
                    <div
                      className="btn btn-dark my-2"
                      onClick={() => {
                        const qty = Math.max(0, field.value.quantity - 1)
                        setFieldValue(`${field.name}.quantity`, qty)
                      }}>
                      <i className="ri-subtract-fill m-auto" />
                    </div>
                  )}
                  <div
                    className="btn btn-success m-2 ml-0"
                    onClick={() => {
                      const qty = field.value.quantity + 1
                      setFieldValue(`${field.name}.quantity`, qty)
                    }}>
                    <i className="ri-add-fill m-auto"/>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>



      {variants.length !== 1 && showOptions && options && options.map(option => {
          return (
            <OptionSelector
              key={`${option.id}`}
              option={option}
              onChange={handleOptionChange} />
          )
        })
      }
    </>
  )
}

ProductSuggested.propTypes = {
  shopifyProduct: PropTypes.instanceOf(Object).isRequired,
  productName: PropTypes.string
}

export default ProductSuggested
