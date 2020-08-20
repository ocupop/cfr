import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {openModal} from '../../common/modals/modalActions'

const ProductBug = ({ product, message = 'Checking inventory' }) => {
  const dispatch = useDispatch()
  const json = JSON.stringify(product, null, 2)

  return (
    <button
      type="button"
      onClick={() => dispatch(openModal('FixModal', {heading: message, body: json}))}
      className="alert alert-info my-2">
      <small>Loading inventory: {product.name && product.name}</small>
    </button>
  )
}

ProductBug.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductBug
