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
          <div className="d-flex align-items-center mb-2">
            <h2 className="m-0">Product Categories</h2>
            <button
              type="button"
              className="ml-2 text-mid"
              onClick={() => dispatch(setProductFilter(''))}>
              <small>(view all)</small>
            </button>
          </div>
          <ul className="nav flex-column">
            {categories.map((category) => (
              <li key={slugify(category)} className="text-uppercase">
                <button
                  type="button"
                  className={filter === category ? 'active' : ''}
                  onClick={() => dispatch(setProductFilter(category))}>{category}</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {brands && brands.length > 0 && (
        <>
          <div className="d-flex align-items-center mb-2">
            <h2 className="m-0">Compatible Brands</h2>
            <button
              type="button"
              className="ml-2 text-mid"
              onClick={() => dispatch(setProductFilter(''))}>
              <small>(view all)</small>
            </button>
          </div>
          <ul className="nav flex-column">
            {brands.map((brand) => (
              <li key={slugify(brand)} className="text-uppercase">
                <button
                  type="button"
                  className={filter === brand ? 'active': ''}
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
