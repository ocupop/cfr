import React from 'react'
import ProductGridCard from './ProductGridCard'
import PropTypes from 'prop-types'

const ProductRelated = ({ props: {relatedProducts} }) => {
  console.log(relatedProducts)

  return (
    <>
      <div id="product-grid" className="responsive-card-deck cards-lg-3 cards-md-2">
        {relatedProducts && relatedProducts.map(product => (
          <ProductGridCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}

ProductRelated.propTypes = {
  products: PropTypes.instanceOf(Array)
}

export default ProductRelated
