export function onPreInit(_: any, pluginOptions: any): void;
export function createPages({ graphql }: {
    graphql: any;
}, pluginOptions: any): Promise<void>;
export function pluginOptionsSchema({ Joi }: {
    Joi: any;
}): any;
export function onCreateWebpackConfig({ actions: { replaceWebpackConfig }, getConfig }: {
    actions: {
        replaceWebpackConfig: any;
    };
    getConfig: any;
}): void;
//# sourceMappingURL=gatsby-node.d.ts.map