/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { formatMoney } from '../../common/utils/helpers'
import { updateCheckout } from '../../shopify/shopifyActions'

const CartSummaryItem = ({ item, client, checkout }) => {
  const dispatch = useDispatch()
  const { variant } = item
  const featuredImage = variant.image.src

  const [quantity, setQuantity] = useState(item.quantity)

  async function removeItem() {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [item.id])
      dispatch(updateCheckout(newCheckout))
      toastr.success('Success', 'Your cart has been updated')
    } catch (error) {
      console.log(error)
      toastr.error('Error', error)
    }
  }

  async function updateItem() {
    if (!quantity) {
      removeItem()
      return
    }
    try {
      const newCheckout = await client.checkout.updateLineItems(checkout.id, [{
        id: item.id,
        quantity: quantity
      }])
      dispatch(updateCheckout(newCheckout))
      toastr.success('Success', 'Your cart has been updated')
    } catch (error) {
      console.log(error)
      toastr.error('Error', error)
    }
  }

  return (
    <>
    <hr className="border-darken" />
    <div className="row py-3">
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
            <strong>{item.title}</strong>
          </small>
        </div>
        <div>
          <small>{variant.title} [{formatMoney(variant.price)}]</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small>Qty:</small>
          <div className="input-group align-items-center ml-2 w-auto">
            <div className="input-group-prepend">
              <button
                className="btn btn-light text-mid"
                type="button"
                onClick={() => setQuantity(quantity ? quantity - 1 : 0)}>
                <i className="ri-subtract-line"></i>
              </button>
            </div>
            <span className="px-3">{quantity}</span>
            <div className="input-group-append">
              <button
                className="btn btn-light text-mid"
                type="button"
                  onClick={() => setQuantity(quantity + 1)}>
                <i className="ri-add-line"></i>
              </button>
            </div>
          </div>
          <div className="btn-group mr-auto" role="group" aria-label="Basic example">
            {quantity !== item.quantity && (
                <button
                  type="button"
                  title="Update Cart"
                  className="btn btn-secondary"
                  onClick={() => updateItem()}>
                  Update
                </button>
            )}
            <button
              type="button"
              title="Remove from cart"
              className="btn text-danger"
              onClick={() => removeItem()}>
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-2 text-right">
        <small>{formatMoney(variant.price * item.quantity)}</small>
      </div>
    </div>
    </>
  )
}

CartSummaryItem.propTypes = {
  item: PropTypes.instanceOf(Object)
}

export default CartSummaryItem
