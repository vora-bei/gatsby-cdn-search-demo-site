import { SimpleIndice } from "full-text-search-server-static-index/dist/simple.indice";
import { NgramIndice } from "full-text-search-server-static-index/dist/ngram.indice";
import { Db } from "full-text-search-server-static-index/dist/db";
export declare const restore: (id: string, dbId: string) => Promise<import("full-text-search-server-static-index").ISharedIndice<any, any>>;
export declare enum Engine {
    "n-gram" = "n-gram",
    "simple" = "simple"
}
export interface ISerializedIndice {
    id: string;
    columns?: string[];
    column?: string;
    type?: Engine;
}
export declare const getIndice: (indice: Partial<ISerializedIndice>) => NgramIndice<unknown> | SimpleIndice<unknown, unknown>;
export declare const getLazyIndice: (indice: Partial<ISerializedIndice>) => typeof NgramIndice.deserialize | typeof SimpleIndice.deserialize;
export declare const restoreDb: (id: string) => Promise<Db>;
//# sourceMappingURL=browser.d.ts.map