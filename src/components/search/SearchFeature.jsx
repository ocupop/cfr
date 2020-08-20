import React from 'react'
// import PropTypes from 'prop-types'

const SearchFeature = props => {
  return (
    <button
      className="nav-link border-0 bg-transparent"
      onClick={() => console.log("SEARCH")}>
      <i className="ri-search-line"></i> Search
    </button>
  )
}

SearchFeature.propTypes = {}

export default SearchFeature
