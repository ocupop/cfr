import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setProductFilter } from '../../shopify/shopifyActions'
import { slugify } from '../../common/utils/helpers'

const CollectionFilters = ({props: {brands, categories}}) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.shopify.filter)
  return (
    <nav className="collectionNav">
      {categories && categories.length > 0 && (
        <>
          <h2>Product Categories</h2>
          <ul className="nav flex-column">
            <li className="text-uppercase">
              <button
                type="button"
                onClick={() => dispatch(setProductFilter(''))}>All</button>
            </li>
            {categories.map((category) => (
              <li key={slugify(category)} className="text-uppercase">
                <button
                  type="button"
                  onClick={() => dispatch(setProductFilter(category))}>{category}</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {brands && brands.length > 0 && (
        <>
          <h3>Brands</h3>
          <ul className="nav flex-column">
            <li className="text-uppercase">
              <button
                type="button"
                onClick={() => dispatch(setProductFilter(''))}>All</button>
            </li>
            {brands.map((brand) => (
              <li key={slugify(brand)} className="text-uppercase">
                <button
                  type="button"
                  onClick={() => dispatch(setProductFilter(brand))}>{brand}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  )
}

CollectionFilters.propTypes = {
  brands: PropTypes.instanceOf(Array),
  categories: PropTypes.instanceOf(Array)
}

export default CollectionFilters
