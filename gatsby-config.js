const proxy = require('http-proxy-middleware')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Cheetah Factory Racing`,
    description: `Snowmobile Racks, Accessories, Backcountry Snowboarding & Snowmobile Adventure Hub`,
    lang: `en`,
    author: `@ocupop`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-background-image`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['content/_scss']
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/img`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://code.jquery.com/jquery-3.4.1.slim.min.js'
      }
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'
      }
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
      }
    },
    // {
    //   resolve: `gatsby-source-instagram-all`,
    //   options: {
    //     access_token: process.env.GATSBY_INSTAGRAM_ACCESS_TOKEN,
    //   }
    // },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `cheetah_snow`,
      },
    },


    // Getting UI Elements

    {
      resolve: 'gatsby-source-custom-api',
      options: {
        url: `${process.env.CMS_BASE_URL}/api/ui.json`,
        // imageKeys: ["images"],
        rootKey: 'elements',
        schemas: {
          elements: `
            slug: String!
            output: String!
          `
        }
      }
    },
    // Getting pages
    {
      resolve: 'gatsby-source-custom-api',
      options: {
        url: `${process.env.CMS_BASE_URL}/api/pages.json`,
        // imageKeys: ["images"],
        rootKey: 'pages',
        schemas: {
          pages: `
            layout: String
            title: String
            content: String
          `
        }
      }
    },
    // Getting Posts
    {
      resolve: 'gatsby-source-custom-api',
      options: {
        url: `${process.env.CMS_BASE_URL}/api/posts.json`,
        rootKey: 'posts',
        schemas: {
          posts: `
            output: String
            url: String
            layout: String
            title: String
            post_date: String
            date: String
            slug: String
          `
        }
      }
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cheetah-factory-racing`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/img/header-logo.png` // This path is relative to the root of the site.
      }
    },

    // {
    //   resolve: 'gatsby-source-google-sheets',
    //   options: {
    //     spreadsheetId: 'get this from the sheet url',
    //     worksheetTitle: 'ie the name in the worksheet tab',
    //     credentials: require('./path-to-credentials-file.json')
    //   }
    // },

    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_ID,
    //     // Defines where to place the tracking script - `true` in the head and `false` in the body
    //     head: false,
    //     // Setting this parameter is optional
    //     anonymize: true,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     // Avoids sending pageview hits from custom paths
    //     exclude: ["/preview/**", "/do-not-track/me/too/"],
    //     // Delays sending pageview hits on route update (in milliseconds)
    //     pageTransitionDelay: 0,
    //     // Enables Google Optimize using your container Id
    //     optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
    //     // Enables Google Optimize Experiment ID
    //     experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
    //     // Set Variation ID. 0 for original 1,2,3....
    //     variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
    //     // Any additional optional fields
    //     sampleRate: 5,
    //     siteSpeedSampleRate: 10,
    //     cookieDomain: "example.com",
    //   },
    // },

    // {
    //   resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
    //   options: {
    //     develop: true, // Activates purging in npm run develop
    //     purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
    //   },
    // }, // must be after other CSS plugins

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    )
  }
}
