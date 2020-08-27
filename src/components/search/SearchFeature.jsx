import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../../common/modals/modalActions'

const SearchFeature = props => {
  const dispatch = useDispatch()

  return (
    <button
      className="nav-link border-0 bg-light text-dark rounded px-3"
      onClick={() => dispatch(openModal('SearchModal'))}>
        <div className="d-flex align-items-center">
          <i className="ri-search-line mr-2"></i> Search
        </div>
    </button>
  )
}

SearchFeature.propTypes = {}

export default SearchFeature
