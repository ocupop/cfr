import React from 'react'
import PropTypes from 'prop-types'

const ProductSuggested = ({ product }) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="col-4 bg-white">
        <div className="bg-image aspect-4x3" />
      </div>
      <div className="col-1"><i className="ri-add-circle-line"></i></div>
      <div className="col-7"><small>Add {product.name}</small></div>
    </div>
  )
}

ProductSuggested.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductSuggested
