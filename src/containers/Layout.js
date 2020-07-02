import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useStaticQuery, graphql } from 'gatsby'
import HEAD from "../common/ui/Head"
import Header from '../common/ui/Header'
import Footer from '../common/ui/Footer'
import LoadingComponent from '../common/ui/LoadingComponent'


function Layout({ children }) {
  const loading = useSelector(state => state.shopify.loading)
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  if (loading) {
    return <LoadingComponent inverted={true} />
  }

  return (
    <>
      <HEAD />
      {/* {props.location.pathname === '/' ? '' : ''} */}
      <Header siteTitle={data.site.siteMetadata.title} />
      <main id="pageContent">
        {children}
      </main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // location: PropTypes.object.isRequired,
}

export default Layout