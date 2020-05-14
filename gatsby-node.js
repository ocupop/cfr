const path = require(`path`)
// const matter = require(`gray-matter`)
const _ = require(`lodash`)
// const slugify = require('slugify')

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, `umd ${request}`)
        }
        callback()
      })
    })
  }
}

// ------------------------
// CREATE PAGES
// ------------------------
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await graphql(`
    query {
      allPages {
        edges {
          node {
            id
            url
            layout
          }
        }
      }
      allCollections {
        edges {
          node {
            id
            url
            layout
          }
        }
      }
      allProducts {
        edges {
          node {
            id
            url
            layout
          }
        }
      }
      allPosts {
        edges {
          node {
            id
            url
            layout
          }
        }
      }

    }
  `).then(
    ({
      data: {
        allPages: { edges: standalone },
        allCollections: { edges: collections },
        allProducts: { edges: products },
        allPosts: { edges: posts }
      }
    }) => {
      const webPages = [
        ...standalone,
        ...posts,
        ...collections,
        ...products
      ]

      // Build Web Pages
      webPages.forEach(({ node: { layout, url, id } }) => {
        const component = path.resolve(`./src/templates/${layout}.jsx`)

        createPage({
          component,
          path: url,
          context: {
            id
          }
        })
      })
    }
  )

  // // Product Pages
  // const canProducts = await graphql(`
  //   query {
  //     allShopifyProduct(filter: {onlineStoreUrl: {regex: "/(?:https\:\/\/cheetahfactoryracing\.com)/"}}) {
  //       edges {
  //         node {
  //           id
  //           handle
  //           title
  //           productType
  //         }
  //       }
  //     }
  //   }
  // `).then(
  //   ({
  //     data: {
  //       allShopifyProduct: { edges: products }
  //     }
  //   }) => {
  //     // Build Web Pages
  //     products.forEach(({ node: { id, store, productType, handle } }) => {
  //       createPage({
  //         component: path.resolve(`./src/templates/product.jsx`),
  //         path: `products/${handle}`,
  //         context: {
  //           id,
  //           store,
  //           productType
  //         }
  //       })
  //     })
  //   }
  // )

  // const productCollections = await graphql(`
  //   query {
  //     allShopifyCollection {
  //       edges {
  //         node {
  //           id
  //           handle
  //           products {
  //             onlineStoreUrl
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   // Build Collection Pages
  //   result.data.allShopifyCollection.edges.forEach(({ node }) => {
  //     if (node.products) {
  //       const storeUrl = node.products[0].onlineStoreUrl
  //       const store = storeUrl.includes("usa.") ? `USA` : `CAN`
  //       const countrySpecificPath = store === 'CAN' ? `${node.handle}` : `us/${node.handle}`

  //       createPage({
  //         path: countrySpecificPath,
  //         component: path.resolve(
  //           `./src/templates/productCollection.jsx`
  //         ),
  //         context: {
  //           // Data passed to context is available in page queries as GraphQL variables.
  //           id: node.id,
  //           store,
  //         },
  //       })
  //     } else {
  //       console.log("NO PRODUCTS")
  //     }
  //   })
  // })
}

// ------------------------
// ON CREATE NODES
// ------------------------

// exports.onCreateNode = async (props) => {

//   const {
//     node,
//     loadNodeContent,
//     actions,
//     createNodeId,
//     reporter,
//     createContentDigest
//   } = props

//   const { createNode, createParentChildLink } = actions

//   // only log for Standalone Pages

//   // what is a media type
//   // image, json (contenttype:json)
//   if (node.internal.mediaType !== `text/html` || node.name === '_defaults') {
//     return
//   }

//   const nodeContent = await loadNodeContent(node)

//   try {
//     const file = matter(nodeContent);

//     if (file.data) {
//       file.data = _.mapValues(file.data, value => {
//         if (_.isDate(value)) {
//           return value.toJSON();
//         }

//         return value;
//       })
//     }

//     const htmlNode = {
//       id: createNodeId(`${node.id} >>> LocalContentSource`),
//       children: [],
//       parent: node.id,
//       internal: {
//         content: file.content,
//         // type: file.data.content_type
//         type: `PageElements`
//       }
//     }

//     htmlNode.frontmatter = file.data
//     htmlNode.title = file.data.title
//     htmlNode.layout = file.data.layout
//     htmlNode.htmlContent = file.content;

//     if (node.internal.type === `File`) {
//       htmlNode.fileAbsolutePath = node.absolutePath;
//     }

//     htmlNode.internal.contentDigest = createContentDigest(htmlNode);
//     createNode(htmlNode);
//     createParentChildLink({
//       parent: node,
//       child: htmlNode
//     });

//     return htmlNode;

//   } catch (err) {
//     reporter.panicOnBuild(`Error processing Store HTML ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n
//       ${err.message}`);
//     return {}; // eslint
//   }

// }
