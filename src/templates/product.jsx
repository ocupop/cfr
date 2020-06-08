import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import { getParseOptions } from '../common/utils/helpers'

const ProductTemplate = ({ data: { products: product }}) => {
  const { output } = product
  const parseOptions = getParseOptions(product)

  return (
    <>
      {parse(output, parseOptions)}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    products(id: { eq: $id }) {
      name
      featuredImage
      shopifyCanadaID
      shopifyUSID
      output
      suggestedProducts {
        name
        featuredImage
        shopifyCanadaID
        shopifyUSID
        slug
        url
      }
    }
  }
`

ProductTemplate.propTypes = {
  data: PropTypes.instanceOf(Object)
}

export default ProductTemplate