import React from 'react'
import PropTypes from 'prop-types'
// import { useSelector, useDispatch } from 'react-redux'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import { getParseOptions } from '../common/utils/helpers'

const CollectionTemplate = ({ data: { collections: collection }}) => {
  const { output } = collection
  const parseOptions = getParseOptions(collection)

  return (
    <>
      {parse(output, parseOptions)}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      title
      label
      description
      products {
        slug
        url
        name
        featuredImage
        cadStorefrontID
        usdStorefrontID
        brands
        categories
      }
      categories
      brands
      output
    }
  }
`

CollectionTemplate.propTypes = {
  data: PropTypes.instanceOf(Object)
}

export default CollectionTemplate