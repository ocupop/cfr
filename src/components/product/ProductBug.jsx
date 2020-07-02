import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {openModal} from '../../common/modals/modalActions'

const ProductBug = ({product}) => {
  const dispatch = useDispatch()
  const json = JSON.stringify(product, null, 2)

  return (
    <button
      type="button"
      onClick={() => dispatch(openModal('FixModal', {heading: 'Product', body: json}))}
      className="alert alert-danger my-2">
      <small>fix issue: {product.name && product.name}</small>
    </button>
  )
}

ProductBug.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductBug