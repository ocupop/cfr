/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext} from 'react'
// import PropTypes from 'prop-types'

import { useRecoilState } from 'recoil'
import { activeCountry } from '../auth/authAtoms'
import StoreContext from "../../common/StoreContext"
// import {client} from '../../store/storeAtoms'
import VariantSelector from './VariantSelector'

const ProductForm = ({ props: { suggestedProducts, shopifyCanadaID, shopifyUSID }}) => {
  const context = useContext(StoreContext)
  const { client } = context
  const [country] = useRecoilState(activeCountry)
  const [productID, setProductID] = useState(null)
  const [product, setProduct] = useState(null)
  const [variants, setVariants] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeVariant, setActiveVariant] = useState(null)
  const [productVariant, setProductVariant] = useState(null)
  const [showVariantImage] = useState(false)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if(productID) {
      const storefrontID = window.btoa(`gid://shopify/Product/${productID}`)
      client.product.fetch(storefrontID).then((product) => {
        setProduct(product)
        setVariants(product.variants)
        setActiveVariant(product.variants[0])
      })
    }

  }, [productID])

  useEffect(() => {
    if(activeVariant) {
      const newProductVariant = client.product.helpers.variantForOptions(product, activeVariant) || activeVariant
      setProductVariant(newProductVariant)
    }
  }, [activeVariant])

  useEffect(() => {
    if(product){
      checkAvailability(product.shopifyId)
    }
  }, [productVariant])

  useEffect(() => {
    const activeID = country === "CA" ? shopifyCanadaID : shopifyUSID
    setProductID(activeID)
  }, [country, shopifyCanadaID, shopifyUSID])

  const checkAvailability = productId => {
    const storefrontID = window.btoa(`gid://shopify/Product/${productID}`)
    client.product.fetch(storefrontID).then(product => {
      console.log("Checking Availability:", product)
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
    console.log(target)
    setActiveVariant(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
    // setShowVariantImage(true)
  }
  const handleAddToCart = () => {
    context.addVariantToCart(productVariant.shopifyId, quantity)
  }

  return (
    <>

      {productVariant && productVariant.price && (
        <>
          <p className="lead mt-3">${productVariant.price}</p>
          <div
            className={showVariantImage ? 'bg-image aspect-4x3 mb-3' : 'bg-image aspect-4x3 mb-3 d-none'}
            style={{ backgroundImage: `` }}/>
        </>
      )}
      {/* <img src={product.featuredImage} alt={product.name} className="img-fluid" /> */}
      {variants.length > 1
        ? product.options.map(option => {
          return (
            <VariantSelector
              key={`${option.id}`}
              option={option}
              onBlur={handleOptionChange}/>
          )
        }) : <span>Choose Your Options</span>}
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

      <div>
        <ul className="list-group">
          {suggestedProducts && suggestedProducts.map((suggestedProduct, key) => {
            return (
              <li key={`suggested_${key}`} className="list-group-item p-0 bg-dark text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="col-4 bg-white">
                    <div className="bg-image aspect-4x3" />
                  </div>
                  <div className="col-1"><i className="ri-add-circle-line"></i></div>
                  <div className="col-7"><small>Add {suggestedProduct.name}</small></div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
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

ProductForm.propTypes = {}

export default ProductForm
