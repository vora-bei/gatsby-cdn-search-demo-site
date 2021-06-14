export interface ISerializedNode {
    [key: string]: any;
}
declare enum Engine {
    "n-gram" = "n-gram"
}
export interface IOptions {
    id: string;
    siteUrl: string;
    graphQL: string;
    engine: {
        type: Engine;
    };
    chunkSize: number;
    normalizer: (results: any) => ISerializedNode[];
    idAttr: string;
    indice?: string[];
}
export declare const buildIndex: (graphql: any, publicPath: string, options: IOptions) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map