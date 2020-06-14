import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import parse from 'html-react-parser'
import { getParseOptions } from '../common/utils/helpers'

const PostTemplate = ({ data: { posts: post } }) => {
  const { output } = post
  const parseOptions = getParseOptions(post)
  return (
    <>
      {parse(output, parseOptions)}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    posts(id: {eq: $id }) {
      title
      output
    }
  }`

PostTemplate.propTypes = {
  data: PropTypes.instanceOf(Object),
}

export default PostTemplate