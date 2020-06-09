import React from 'react'
import PropTypes from 'prop-types'
import { formatMoney } from '../../common/utils/helpers'

const CartSummaryItem = ({ item }) => {
  const { title, quantity, variant } = item
  const featuredImage = variant.image.src

  return (
    <div className="row border-top py-3">
      <div className="col-3">
        <div
          className="bg-image aspect-4x3"
          style={{
            backgroundImage: `url(${featuredImage})`
          }}
        />
      </div>
      <div className="col-7">
        <div>
          <small className="mb-0 text-uppercase">
            <strong>{title}</strong>
          </small>
        </div>
        <div>
          <small>{variant.title} [{formatMoney(variant.price)}]</small>
        </div>
        <div>
          <small>
            Qty: {quantity}
            <br/>
            <a href="/cart" className="text-info"><i className="ri-edit-2-line"></i> edit</a>
          </small>
        </div>
      </div>
      <div className="col-2 text-right">
        <small>{formatMoney(variant.price * quantity)}</small>
      </div>
    </div>
  )
}

CartSummaryItem.propTypes = {
  item: PropTypes.instanceOf(Object)
}

export default CartSummaryItem
