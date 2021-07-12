module.exports = {
  siteMetadata: {
    title: "search example site",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-image",
    {
      resolve: require.resolve("./cdn-indice-plugin"),
      options: {
        id: 'countries',
        chunkSize: 1000,
        indices: [
          { id: 'name', column: 'name', },
          { id: 'ngram', type: "n-gram", actuationLimit: 2, actuationLimitAuto: true, gramLen: 3, toLowcase: true, columns: ['name'], }
        ],
        idAttr: 'id',
        dataAttrs: ['name', 'id'],
        normalizer: ({ data }) => {
          let i = 1;
          return data.allMoviesJson.edges
            .map(({ node }) => ({ id: i++, name: node.name }));
        },
        graphQL: `query MyQuery {
           allMoviesJson { edges { node { name id } } } 
          }`
      }
    },
    {
      resolve: require.resolve("./cdn-indice-plugin"),
      options: {
        id: 'cars',
        chunkSize: 10000,
        indices: [
          { id: 'model', column: 'model', },
          { id: 'make', column: 'make', },
          { id: 'year', column: 'year', },
          { id: 'state', column: 'state', },
          { id: 'ngram', type: "n-gram", actuationLimit: 2, actuationLimitAuto: true, gramLen: 3, toLowcase: true, 
          columns: ['model', 'make', 'color'], }
        ],
        idAttr: 'id',
        normalizer: ({ data }) => {
          return data.allSqliteCars.edges
            .map(({ node: {id, ...node} }) => ({ id: id.replace('sqlite__Cars__',''), ...node }));
        },
        graphQL: `query MyQuery {
          allSqliteCars(skip: 50000) {
          edges {
            node {
              id
              color
              make
              mmr
              model
              seller
              sellingprice
              state
              transmission
              trim
              vin
              year
            }
          }
        }
      }`
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
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
    },
    {
      resolve: `gatsby-source-sqlite`,
      options: {
        fileName: './data/mydb.sqlite',
        queries: [
          {
            statement: 'SELECT * FROM cars limit 200000',
            idFieldName: 'id',
            name: 'cars'
          }
        ]
      }
    },

    // 'gatsby-plugin-offline'
  ],
};
