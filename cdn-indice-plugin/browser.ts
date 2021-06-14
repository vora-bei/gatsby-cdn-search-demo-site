import { SimpleIndice } from "full-text-search-server-static-index/dist/simple.indice";
import { NgramIndice } from "full-text-search-server-static-index/dist/ngram.indice";
import { RangeLinearIndice } from "full-text-search-server-static-index/dist/range.linear.indice";
import { restoreSharedIndices } from "full-text-search-server-static-index/dist/utils.browser";


export const restore = async (id: string) => {
    return restoreSharedIndices<any, any>({
        id,
        baseUrl: '/cdn-indice/indice/',
        deserializeShared: RangeLinearIndice.lazy,
        deserialize: NgramIndice.deserialize
    })
}
export const restoreData = async (id: string) => {
    return restoreSharedIndices<any, any>({
        id,
        baseUrl: '/cdn-indice/indice/',
        deserializeShared: RangeLinearIndice.lazy,
        deserialize: SimpleIndice.deserialize
    })
}