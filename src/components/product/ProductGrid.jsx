import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProductFilter } from '../../shopify/shopifyActions'
import ProductGridCard from './ProductGridCard'
import PropTypes from 'prop-types'

const ProductGrid = ({props: { products }}) => {
  const dispatch = useDispatch()
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
  }, [filter, products])

  return (
    <>
      {filter && (
        <div className="alert alert-mid d-flex align-items-center">
          <p className="m-0"><strong>Filtered:</strong> {filter}</p>
          <button title="Clear Filters" type="button" onClick={() => dispatch(setProductFilter(''))} className="btn btn-light text-dark ml-auto">
            <i className="ri-close-line d-inline-block"></i>
          </button>
        </div>

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
