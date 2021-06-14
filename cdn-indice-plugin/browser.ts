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
export const load =  async <T>(indexId: string, ids: T[]) => {
    return Promise.all(ids.map((id)=>fetch(`/cdn-indice/data/${indexId}/n.${id}.json`).then(r=> r.json())))
}