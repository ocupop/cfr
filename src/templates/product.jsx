import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ProductForm from '../features/product/ProductForm'
import Image from 'gatsby-image'
import RelatedProducts from '../features/product/RelatedProducts'
import BackgroundImage from "gatsby-background-image"

// import ProductList from '../features/product/ProductList'

const ProductDetail = ({ data, location }) => {
  const shareUrl = encodeURIComponent(location.href)
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`

  const product = data.shopifyProduct
  console.log(product)
  const [mainImage, setMainImage] = useState(product.images[0].localFile.childImageSharp.fluid)
  console.log(mainImage)
  const allRelatedProducts = data.allShopifyProduct
  const randomProducts = allRelatedProducts.edges.sort(function (a, b) { return 0.5 - Math.random() })
  const relatedProducts = randomProducts.slice(0, 3)

  return (
    <>
      <section className="py-0">
        <div className="container">
          <div className="d-block d-lg-none">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h1 className="h4 mb-3">{product.productType}<small>
                    / {product.title}
                  </small></h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="content">
                  <BackgroundImage
                    Tag="div"
                    className="bg-image aspect-4x3"
                    fluid={mainImage}
                    backgroundColor={`#fff`}
                    style={{
                      backgroundSize: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <div className="d-flex align-items-center product-thumbnails mb-3">
                    {product.images.map(image => (
                      <BackgroundImage
                        Tag="div"
                        className="bg-image aspect-thumbnail"
                        key={image.id}
                        onClick={() => { setMainImage(image.localFile.childImageSharp.fluid) }}
                        fluid={image.localFile.childImageSharp.fluid}
                        backgroundColor={`#fff`}
                        style={{
                          backgroundSize: 'contain'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 pt-5 order-2 order-lg-1">
              <div className="d-none d-lg-block">
                <div className="row">
                  <div className="col-12">
                    <div className="content">
                      <h3>{product.productType}<small>
                        / {product.title}
                      </small></h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <BackgroundImage
                        Tag="div"
                        className="bg-image aspect-4x3"
                        fluid={mainImage}
                        backgroundColor={`#fff`}
                        style={{
                          backgroundSize: 'contain'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex align-items-center product-thumbnails">
                      {product.images.map(image => (
                        <BackgroundImage
                          Tag="div"
                          className="bg-image aspect-thumbnail"
                          key={image.id}
                          onClick={() => { setMainImage(image.localFile.childImageSharp.fluid) }}
                          fluid={image.localFile.childImageSharp.fluid}
                          backgroundColor={`#fff`}
                          style={{
                            backgroundSize: 'contain'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="content">
                    <h1 className="mt-lg-5 mb-lg-3">{product.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                      className="productDescription"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 pt-lg-5 sidebar order-1 order-lg-2">
              <div className="content sidebar-layout-content productDetails position-sticky sticky-top">
                <p className="mb-0 text-uppercase text-white-50">
                  {product.productType}
                </p>
                <h1 className="h4 mb-3">{product.title}</h1>
                <ProductForm product={product} />
                <h5 className="text-uppercase">Share this</h5>
                <p className="product-social">
                  {facebookUrl && facebookUrl &&
                    <a href={facebookUrl} target="_blank" rel="noopener" className="text-white mr-2" aria-label="Facebook Share Link">
                      <i className="ri-facebook-fill"></i>
                    </a>
                  }
                  {twitterUrl && twitterUrl &&
                    <a href={twitterUrl} target="_blank" rel="noopener" className="text-white mr-2" aria-label="Twitter Share Link">
                      <i className="ri-twitter-fill"></i>
                    </a>
                  }
                </p>
                {/* <h5 className="text-uppercase">Quick Links</h5>
                <ul className="nav flex-column">
                  {specifications_html && <li><a href="#ProductSpecifications">Product Specs</a></li>}
                  {instructions_html && <li><a href="#ProductInstructions">Instructions</a></li>}
                  {required_products && <li><a href="#ProductRequirements">Requirements</a></li>}
                  {faq && <li><a href="#ProductFaq">Product FAQ</a></li>}
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts relatedProducts={relatedProducts} />
      <BackgroundImage
        Tag="div"
        className="bg-image aspect-footer-hero"
        fluid={data.background_hero.childImageSharp.fluid}
      ></BackgroundImage>
    </>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    background_hero: file(relativePath: { eq: "cfr-footer-4.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allShopifyProduct(filter: {productType: {eq: $productType}, id: {ne: $id}}) {
      edges {
        node {
          id
          handle
          title
          productType
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images {
            localFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    shopifyProduct(id: {eq: $id }) {
      title
      shopifyId
      description
      descriptionHtml
      productType
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
      options {
        id
        name
        values
      }
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
      updatedAt(fromNow: true)
      variants {
        title
        price
        availableForSale
        shopifyId
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        selectedOptions {
          name
          value
        }
        sku
      }
    }
  }
`

export default ProductDetail
