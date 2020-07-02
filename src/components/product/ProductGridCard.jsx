import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { getPriceRange } from '../../common/utils/helpers'

const ProductGridCard = ({ product }) => {
  const { name, categories, url, featuredImage, cadStorefrontID } = product
  const shopifyProduct = useSelector(state => state.shopify.products[cadStorefrontID])

  return (
    <>
      <a href={url} className="card">
        <div className="card-image-wrapper">
          <div
            className="bg-image aspect-4x3"
            style={{backgroundImage: `url(${featuredImage})`}}/>
        </div>
        <div className="card-footer">
          <p className="text-uppercase mb-0">
            {categories && <span>{categories[0]}</span>}
          </p>
          <h5 className="card-title mb-0">{name}</h5>
          {shopifyProduct ? (
            <p className="card-text">{getPriceRange(shopifyProduct)}</p>
          ) : (
            <Skeleton height={10} />
          )}
        </div>
      </a>
    </>
  )
}

ProductGridCard.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductGridCard
