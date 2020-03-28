import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import BackgroundImage from "gatsby-background-image"
import StoreContext from "../../common/StoreContext"
import VariantSelector from "../../features/product/VariantSelector"

const ProductForm = ({ product }) => {
  console.log(product.variants)
  const context = useContext(StoreContext)
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(product.variants[0])

  const hasVariants = product.variants.length > 1
  const productVariant =
    context.client.product.helpers.variantForOptions(product, variant) ||
    variant

  const [showVariantImage, setShowVariantImage] = useState(false)
  const [available, setAvailable] = useState(productVariant.availableForSale)

  useEffect(() => {
    let defaultOptionValues = {}
    product.options.forEach(selector => {
      defaultOptionValues[selector.name] = selector.values[0]
    })
    setVariant(defaultOptionValues)
  }, [])

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant])

  // console.log('productVariant.image',productVariant.image)

  const checkAvailability = productId => {
    context.client.product.fetch(productId).then(product => {
      // this checks the currently selected variant for availability

      const result = product.variants.filter(
        variant => variant.id === productVariant.shopifyId
      )
      //check for results undefined
      if (result[0] == null) {
        setAvailable(false)
      } else {
        setAvailable(result[0].available)
      }

    })
  }

  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handleOptionChange = event => {
    const { target } = event
    setVariant(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
    setShowVariantImage(true)
  }

  const handleAddToCart = () => {
    context.addVariantToCart(productVariant.shopifyId, quantity)
  }

  const variantSelectors = hasVariants
    ? product.options.map(option => {
      return (
        <VariantSelector
          onChange={handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      )
    })
    : null

  return (
    <>
      {productVariant.price &&
        <p className="lead mt-3">${productVariant.price}</p>
      }

      {productVariant &&

        <BackgroundImage
          Tag="div"
          className={showVariantImage ? 'bg-image aspect-4x3 mb-3' : 'bg-image aspect-4x3 mb-3 d-none'}
          fluid={productVariant.image.localFile.childImageSharp.fluid}
          backgroundColor={`#fff`}
          style={{
            backgroundSize: 'contain'
          }}
        />
      }

      {variantSelectors}
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
          className="form-control"
        />
      </div>

      <br />
      {available ? (
        <button
          type="submit"
          className="btn btn-secondary mb-3 mb-lg-5"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      ) : (<p className="lead mb-5">This Product is out of Stock!</p>)}
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        image: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            originalSrc: PropTypes.string,
          })
        ),
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
