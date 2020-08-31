/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../../common/modals/modalActions'
import OptionSelector from './OptionSelector'
import { getPriceRange } from '../../common/utils/helpers'


const ProductVariant = ({ client, productName, shopifyProduct, field, form: { errors, touched, setFieldValue } }) => {
  const { options, images, variants } = shopifyProduct
  const dispatch = useDispatch()

  const [selectedVariant, setSelectedVariant] = useState()
  const [variantOptions, setVariantOptions] = useState(null)
  const [quantity] = useState(1)

  const handleOptionChange = ({ target: { name, value } }) => {
    setVariantOptions(options => ({ ...options, [name]: value }))
  }

  useEffect(() => {
    if(variants.length === 1) {
      setSelectedVariant(variants[0])
    }
  }, [])

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
    if (selectedVariant && selectedVariant.available) {
      const title = `${productName} (${selectedVariant.title})`
      setFieldValue(`${field.name}.customAttributes[0].key`, 'title')
      setFieldValue(`${field.name}.customAttributes[0].value`, title)
      setFieldValue(`${field.name}.variantId`, selectedVariant.id)
      setFieldValue(`${field.name}.quantity`, quantity)
    }

    if (!selectedVariant || !selectedVariant.available) {
      setFieldValue(`${field.name}.customAttributes`, [])
      setFieldValue(`${field.name}.variantId`, null)
      setFieldValue(`${field.name}.quantity`, 0)
    }

  }, [selectedVariant, quantity])

  console.log('selectedvariant', selectedVariant)
  return (
    <>
      {selectedVariant ? (
        <>
          
          <p className="lead">${selectedVariant.price}</p>
          <div
            className='bg-image bg-white aspect-4x3 mb-3 bg-contain'
            style={{ backgroundImage: `url(${selectedVariant.image.src})` }}
            onClick={() => dispatch(openModal('ImageModal', { image: selectedVariant.image.src }))}>
            {selectedVariant.available ? '' : <p className="badge badge-danger sold-out-badge">Sold Out</p>}  
          </div>    
        </>
      ) : (
        <>
          <p className="lead">{getPriceRange(shopifyProduct)}</p>
          <div
            className='bg-image bg-white aspect-4x3 mb-3 bg-contain'
            style={{ backgroundImage: `url(${images[0].src})` }}
            onClick={() => dispatch(openModal('ImageModal', { image: images[0].src }))}>
          </div>    
        </>
      )}

      {variants.length !== 1 && options && options.map(option => {
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

ProductVariant.propTypes = {
  shopifyProduct: PropTypes.instanceOf(Object).isRequired,
  productName: PropTypes.string
}

export default ProductVariant
