import { Engine, ISerializedIndice } from "../browser";
export interface ISerializedNode {
    [key: string]: any;
}
export interface IOptions {
    id: string;
    siteUrl: string;
    graphQL: string;
    engine: {
        type: Engine;
    };
    chunkSize: number;
    dataChunkSize: number;
    normalizer: (results: any) => ISerializedNode[];
    idAttr: string;
    dataAttrs: string[];
    indices: ISerializedIndice[];
}
export declare const buildIndex: (graphql: any, options: IOptions) => Promise<void>;
//# sourceMappingURL=index.d.ts.map