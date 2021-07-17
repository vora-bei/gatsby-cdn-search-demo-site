const csv = require('csv-parser');
const fs = require('fs');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type Car implements Node @dontInfer {
        color: String
        make: String
        mmr: String
        model: String
        seller: String
        sellingprice: String
        state: String
        transmission: String
        trim: String
        vin: String
        year: Int
    }
    `
    createTypes(typeDefs)
}
exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        Query: {
            recentCars: {
                args: {
                    cursor: "Int!",
                    limit: "Int!",
                },
                type: ["Car"],
                resolve(source, args, context, info) {
                    return new Promise((s, e) => {
                        const subResults = [];
                        let id = 0;
                        fs.createReadStream('./data/car_prices.csv')
                            .pipe(csv({ "separator": "," }))
                            .on('data', (row) => {
                                if (subResults.length > args.limit+args.cursor ) {
                                    return;
                                }
                                subResults.push({ id: `Car__${id++}`, ...row });
                            })
                            .on('end', () => {
                                s(subResults.splice(-args.limit , args.limit));
                                console.log('CSV file successfully processed');
                            });
                    })
                },
            },
        },
    }
    createResolvers(resolvers)
}