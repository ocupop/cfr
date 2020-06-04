import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from "gatsby-background-image"
import { slugify } from '../../common/helpers'

const ProductList = ({ products, productCategory }) => {
  const filteredProducts = products.filter(product => {
    const slugifiedTags = product.tags.map(tag => slugify(tag))
    return productCategory === "" || slugify(product.productType) === slugify(productCategory) || slugifiedTags.includes(productCategory)
  })

  return (
    <>
      <h4>{productCategory}: </h4>
      <div className="responsive-card-deck cards-lg-3 cards-md-2">
        {filteredProducts && filteredProducts.map(product => (
          <Link
            key={product.id}
            className="card"
            to={`/products/${product.handle}`}
          >
            <div className="card-image-wrapper">
              <BackgroundImage
                Tag="div"
                className="bg-image aspect-4x3"
                fluid={product.images[0].localFile.childImageSharp.fluid}
                backgroundColor={`#fff`}
                style={{
                  backgroundSize: 'contain'
                }}
              />
            </div>
            <div className="card-footer">
              <p className="text-uppercase mb-0">
                {product.productType}
              </p>
              <h5 className="card-title mb-0">{product.title}</h5>
              <p className="card-text">
                From ${product.priceRange.minVariantPrice.amount}
              </p>
            </div>
          </Link>
        ))
        }
      </div>
    </>
  )
}

export default ProductList
