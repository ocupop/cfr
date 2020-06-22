import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {openModal} from '../../common/modals/modalActions'

const ProductBug = ({product}) => {
  const dispatch = useDispatch()
  const json = JSON.stringify(product, null, 2)

  return (
    <div
      onClick={() => dispatch(openModal('FixModal', {heading: 'Product', body: json}))}
      className="alert alert-danger">
      <small>fix issue: {product.name && product.name}</small>
    </div>
  )
}

ProductBug.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductBug
