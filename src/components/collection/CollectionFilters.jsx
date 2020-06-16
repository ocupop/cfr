import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from "@reach/router"
import queryString from 'query-string'
import { slugify } from '../../common/utils/helpers'

const getFilter = (query) => {
  const defaultFilter = ''
  if (query) {
    const queriedFilter = queryString.parse(query)
    const { filter } = queriedFilter
    return filter
  }
  return defaultFilter
}

const CollectionFilters = ({props: {brands, categories}}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const defaultFilter = (location.search && getFilter(location.search)) || ''
  const [filter, setFilter] = useState(defaultFilter)

  useEffect(() => {
    navigate(`${location.pathname}?filter=${filter}`,{replace: true})
  }, [filter])

  return (
    <nav className="collectionNav">
      {categories && categories.length > 0 && (
        <>
          <div className="d-flex align-items-center mb-2">
            <h2 className="m-0">Product Categories</h2>
            <button
              type="button"
              className="ml-2 text-mid"
              onClick={() => setFilter('')}>
              <small>(view all)</small>
            </button>
          </div>
          <ul className="nav flex-column">
            {categories.map((category) => (
              <li key={slugify(category)} className="text-uppercase">
                <button
                  type="button"
                  className={filter === slugify(category) ? 'active' : ''}
                  onClick={() => setFilter(slugify(category))}>{category}</button>
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
              onClick={() => setFilter('')}>
              <small>(view all)</small>
            </button>
          </div>
          <ul className="nav flex-column">
            {brands.map((brand) => (
              <li key={slugify(brand)} className="text-uppercase">
                <button
                  type="button"
                  className={filter === slugify(brand) ? 'active': ''}
                  onClick={() => setFilter(slugify(brand))}>{brand}</button>
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
