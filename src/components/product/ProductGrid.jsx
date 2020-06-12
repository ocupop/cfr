import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductGridCard from './ProductGridCard'
import PropTypes from 'prop-types'

const ProductGrid = ({props: { products }}) => {
  const filter = useSelector(state => state.shopify.filter)
  const [filteredProducts, setFilteredProducts] = useState(products)
  useEffect(() => {
    const results = products.filter((product) => {
      const {categories, brands} = product
      if(filter === '') return true
      if (brands && brands.includes(filter)) {
        return true
      }
      if (categories && categories.includes(filter)) {
        return true
      }
      return false
    })

    setFilteredProducts(results)
  }, [filter])

  return (
    <>
      {filter && (
        <p className="alert alert-mid"><strong>Filtered:</strong> {filter}</p>
      )}
      <div id="product-grid" className="responsive-card-deck cards-lg-3 cards-md-2">
        {filteredProducts && filteredProducts.map(product => (
          <ProductGridCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}

ProductGrid.propTypes = {
  products: PropTypes.instanceOf(Array)
}

export default ProductGrid
