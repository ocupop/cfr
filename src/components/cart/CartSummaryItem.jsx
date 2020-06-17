import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { formatMoney } from '../../common/utils/helpers'
import { updateCheckout } from '../../shopify/shopifyActions'

const CartSummaryItem = ({ item }) => {
  const dispatch = useDispatch()
  const { title, quantity, variant } = item
  const featuredImage = variant.image.src
  const client = useSelector(state => state.shopify.client)
  const checkout = useSelector(state => state.shopify.checkout)

  async function removeItem() {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [item.id])
      console.log(newCheckout)
      dispatch(updateCheckout(newCheckout))
      toastr.success('Success', 'Your cart has been updated')
    } catch (error) {
      console.log(error)
      toastr.error('Error', error)
    }
  }

  return (
    <>
    <hr/>
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
            <p onClick={() => removeItem()}>
              <i className="ri-delete-bin-fill"></i> remove
            </p>
          </small>
        </div>
      </div>
      <div className="col-2 text-right">
        <small>{formatMoney(variant.price * quantity)}</small>
      </div>
    </div>
    </>
  )
}

CartSummaryItem.propTypes = {
  item: PropTypes.instanceOf(Object)
}

export default CartSummaryItem
