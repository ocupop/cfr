import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import parse from 'html-react-parser'
import { getElementParseOptions } from '../utils/helpers'

const Footer = () => {
  const { elements: { output: content } } = useStaticQuery(graphql`
    {
      elements(slug: { eq: "footer" }) {
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

export default Footer
