const path = require(`path`)
const _ = require(`lodash`)

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
}
