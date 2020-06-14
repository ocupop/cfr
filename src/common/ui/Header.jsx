import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import parse from 'html-react-parser'
import { getElementParseOptions } from '../utils/helpers'

const Header = () => {
  const { elements: { output: content } } = useStaticQuery(graphql`
    {
      elements(slug: { eq: "header" }) {
        output
      }
    }
  `)
  const parseOptions = getElementParseOptions()

  return (
    <>
      {parse(content, parseOptions)}
    </>
  )
}

export default Header