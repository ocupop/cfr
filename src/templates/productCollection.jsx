import React, { useState } from "react"
import { graphql } from "gatsby"
import ProductList from '../features/product/ProductList'
import BackgroundImage from "gatsby-background-image"
import { decodeURLParams } from '../common/helpers'

const CollectionDetail = ({ data, location }) => {
  const urlParams = decodeURLParams(location.search)
  const { products, handle } = data.shopifyCollection
  const productCategories = [...new Set(products.map(product => product.productType))]
  const [productCategory, setProductCategory] = useState(urlParams.category || "")
  const [filterNavVisibility, setFilterNavVisibility] = useState(true)
  const [brandNavVisibility, setBrandNavVisibility] = useState(true)

  return (
    <>
      <section className="py-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 order-2 order-lg-1">
              <div className="py-3 py-lg-5">
                <ProductList products={products} productCategory={productCategory} />
              </div>
            </div>
            <div className="col-12 col-lg-4 sidebar order-1 order-lg-2">
              <div className="py-3 py-lg-5 px-3 position-sticky sticky-top">
                <nav className="collectionNav">
                  <h2 onClick={() => { { setFilterNavVisibility(!filterNavVisibility) } }}>Product Categories <span className="d-inline-block d-lg-none">{filterNavVisibility ? '+' : '-'}</span></h2>

                  <ul className={filterNavVisibility ? 'nav flex-column' : 'nav flex-column active'}>
                    <li className={`nav-item ${productCategory === "" ? "active" : ""}`} onClick={() => {
                      setProductCategory("")
                      setFilterNavVisibility(!filterNavVisibility)
                    }}>All</li>
                    {productCategories && productCategories.map((category, index) => (
                      <li
                        key={`cat_${index}`}
                        className={`nav-item ${productCategory === category ? "active" : ""}`}
                        onClick={() => {
                          setProductCategory(category)
                          setFilterNavVisibility(!filterNavVisibility)
                        }}>{category}</li>
                    ))}
                  </ul>


                  {handle && handle === 'snowmobile' && (
                    <>
                      <h3 onClick={() => { { setBrandNavVisibility(!brandNavVisibility) } }}>Brands <span className="d-inline-block d-lg-none">{brandNavVisibility ? '+' : '-'}</span></h3>
                      <ul className={brandNavVisibility ? 'nav flex-column' : 'nav flex-column active'}>
                        <li className={`nav-item ${productCategory === "Yamaha" ? "active" : ""}`} onClick={() => setProductCategory("yamaha")}>Yamaha</li>
                        <li className={`nav-item ${productCategory === "polaris" ? "active" : ""}`} onClick={() => setProductCategory("polaris")}>Polaris</li>
                        <li className={`nav-item ${productCategory === "Arctic Cat" ? "active" : ""}`} onClick={() => setProductCategory("arctic-cat")}>Arctic Cat</li>
                        <li className={`nav-item ${productCategory === "Ski-Doo" ? "active" : ""}`} onClick={() => setProductCategory("ski-doo")}>Ski-Doo</li>
                      </ul>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackgroundImage
        Tag="div"
        className="bg-image aspect-footer-hero"
        fluid={data.background_hero.childImageSharp.fluid}
      ></BackgroundImage>
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    intro_hero: file(relativePath: { eq: "bg-intro.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    background_hero: file(relativePath: { eq: "cfr-footer-2.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    shopifyCollection(id: {eq: $id }) {
      handle
      products {
        id
        shopifyId
        title
        handle
        description
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        productType
        tags
        updatedAt
      }
    }
  }
`

export default CollectionDetail
