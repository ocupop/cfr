import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import _ from 'lodash'
import parse from 'html-react-parser'
import { getParseOptions } from '../common/utils/helpers'

const CollectionTemplate = ({ data: { collections: { output } }}) => {
  const parseOptions = getParseOptions()

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
      output
    }
  }
`

CollectionTemplate.propTypes = {
  data: PropTypes.instanceOf(Object)
}

export default CollectionTemplate