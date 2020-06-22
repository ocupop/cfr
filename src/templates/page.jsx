import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import { getParseOptions } from '../common/utils/helpers'

const PageTemplate = ({ data: { pages: page} }) => {
  const { content } = page
  const parseOptions = getParseOptions(page)

  return (
    <>
      {parse(content, parseOptions)}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    pages(id: { eq: $id }) {
      title
      content
      relatedProducts {
        name
        featuredImage
        cadStorefrontID
        usdStorefrontID
        slug
        url
      }
    }
  }
`

PageTemplate.propTypes = {
  data: PropTypes.instanceOf(Object)
}

export default PageTemplate