import React from "react"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"


const RelatedProducts = ({ relatedProducts }) => {
  const relatedProductsArray = relatedProducts
  return (
    <>
      {relatedProducts.length > 0 &&
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h3>Related Products</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <div className="responsive-card-deck cards-lg-3 cards-md-2">
                    {relatedProductsArray && relatedProductsArray.map(product => (
                      <Link
                        key={product.node.id}
                        className="card"
                        to={`/products/${product.node.handle}`}
                      >
                        <div className="card-image-wrapper">
                          <BackgroundImage
                            Tag="div"
                            className="bg-image aspect-4x3"
                            fluid={product.node.images[0].localFile.childImageSharp.fluid}
                            backgroundColor={`#fff`}
                            style={{
                              backgroundSize: 'contain'
                            }}
                          />
                        </div>
                        <div className="card-footer">
                          <p className="text-uppercase mb-0">
                            {product.node.productType}
                          </p>
                          <h5 className="card-title mb-0">{product.node.title}</h5>
                          <p className="card-text">
                            From ${product.node.priceRange.minVariantPrice.amount}
                          </p>
                        </div>
                      </Link>
                    ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default RelatedProducts