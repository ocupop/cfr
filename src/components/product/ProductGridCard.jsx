import React from 'react'
import PropTypes from 'prop-types'

const ProductGridCard = ({product}) => {
  const { name, categories, url, featuredImage } = product

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
          <p className="card-text">
            From $0.00
          </p>
        </div>
      </a>
    </>
  )
}

ProductGridCard.propTypes = {
  product: PropTypes.instanceOf(Object)
}

export default ProductGridCard
