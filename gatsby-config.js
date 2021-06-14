module.exports = {
  siteMetadata: {
    title: "search example site",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-image",
    {
      resolve:  require.resolve("./cdn-indice-plugin"),
      options: {
        id: 'pages',
        engine: {
          type: "n-gram",
          actuationLimit: 2,
          actuationLimitAuto: true,
          gramLen: 3,
          toLowcase: true,
        },

     // Field used as the reference value for each document.
        // Default: 'id'.
        idAttr: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['name'],

        normalizer: ({ data }) =>
          data.allMoviesJson.edges.map(({node}) => ({
            id: node.id,
            name: node.name
          })),

        graphQL:`query MyQuery {
          allMoviesJson {
            edges {
              node {
                name
                id
              }
            }
          }
        }`
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `movies`,
        path: `${__dirname}/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    }
  ],
};
