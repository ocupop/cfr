import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation, globalHistory, useNavigate } from "@reach/router"
import queryString from 'query-string'
import ProductGridCard from './ProductGridCard'
import { slugify, getFilter } from '../../common/utils/helpers'

const ProductGrid = ({ props: { products } }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const defaultFilter = (location.search && getFilter(location.search)) || ''
  const [filter, setFilter] = useState(defaultFilter)
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    const results = products.filter((product) => {
      const {categories, brands} = product

      if (filter === '') {
        navigate(`${location.pathname}?filter=${filter}`, { replace: true })
        return true
      }

      if (brands) {
        const slugifiedBrands = brands.map(brand => slugify(brand))
        if(slugifiedBrands.includes(filter)) return true
      }
      if (categories) {
        const slugifiedCategories = categories.map(category => slugify(category))
        if (slugifiedCategories.includes(filter)) return true
      }
      return false
    })

    setFilteredProducts(results)
  }, [filter, products])

  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      setFilter(getFilter(location.search))
    })
  }, [])

  return (
    <>
      {filter && (
        <div className="alert alert-mid d-flex align-items-center">
          <p className="m-0 text-capitalize"><strong>Filtered Products:</strong> {filter.replace('-', ' ')}</p>
          <button title="Clear Filters" type="button" onClick={() => setFilter('')} className="btn btn-light text-dark ml-auto">
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
