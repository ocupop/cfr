import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from "@reach/router"
import { slugify, getFilter } from '../../common/utils/helpers'


const CollectionFilters = ({props: {title, brands, categories}}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const defaultFilter = (location.search && getFilter(location.search)) || ''
  const [filter, setFilter] = useState(defaultFilter)
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    navigate(`${location.pathname}?filter=${filter}`,{replace: true})
    setShowFilters(false)
  }, [filter, location.pathname, navigate])

  return (
    <>
      <div className="alert alert-mid d-flex align-items-center d-md-none">
        <button type="button" className="btn text-inherit" onClick={() => setShowFilters(!showFilters)}>
          <i className="ri-filter-3-line"></i>
        </button>
        {filter && (
          <>
            <p className="m-0 text-capitalize"><strong>Filtered Products:</strong> {filter.replace('-', ' ')}</p>
            <button title="Clear Filters" type="button" onClick={() => setFilter('')} className="btn btn-light text-dark ml-auto">
              <i className="ri-close-line d-inline-block"></i>
            </button>
          </>
        )}
      </div>
      <nav className="collectionNav">
      {categories && categories.length > 0 && (
        <div
            className={showFilters ? 'd-block' : 'd-none d-md-block'}>
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
                        className={filter === slugify(brand) ? 'active' : ''}
                        onClick={() => setFilter(slugify(brand))}>{brand}</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
        </div>
      )}

    </nav>
    </>
  )
}

CollectionFilters.propTypes = {
  brands: PropTypes.instanceOf(Array),
  categories: PropTypes.instanceOf(Array)
}

export default CollectionFilters
