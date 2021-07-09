import { SimpleIndice } from "full-text-search-server-static-index/dist/simple.indice";
import { NgramIndice } from "full-text-search-server-static-index/dist/ngram.indice";
import { RangeLinearIndice } from "full-text-search-server-static-index/dist/range.linear.indice";
import { restoreSharedIndices } from "full-text-search-server-static-index/dist/utils.browser";
import { Db } from "full-text-search-server-static-index/dist/db";
import { Schema } from "full-text-search-server-static-index/dist/schema";

const baseUrl = '/cdn-indice/';

export const restore = async (id: string, dbId: string) => {
    return restoreSharedIndices<any, any>({
        id,
        baseUrl: `/cdn-indice/${dbId}`,
        deserializeShared: RangeLinearIndice.lazy,
        deserialize: NgramIndice.deserialize
    })
}
export enum Engine {
    "n-gram" = "n-gram",
    "simple" = "simple"
}
export interface ISerializedIndice { id: string, columns?: string[], column?: string, type?: Engine };

export const getIndice = (indice: Partial<ISerializedIndice>) => {
    const { type = "simple", ...options } = indice;
    if (type === "n-gram") {
        return new NgramIndice(options);
    }
    if (type === "simple") {
        return new SimpleIndice(options);
    }
    throw new Error(`Engine ${type} not found`)
}
export const getLazyIndice = (indice: Partial<ISerializedIndice>) => {
    const { type = "simple" } = indice;
    if (type === "n-gram") {
        return NgramIndice.deserialize;
    }
    if (type === "simple") {
        return SimpleIndice.deserialize;
    }
    throw new Error(`Engine ${type} not found`)
}

const getIndicePath = (indice: ISerializedIndice) => {
    const { type = "simple", column } = indice;
    if (column && type === "simple") {
        return column;
    } else {
        return `\$${indice.id}`;
    }
}
export const restoreDb = async (id: string) => {
    const response = await fetch(`${baseUrl}${id}/indices.${id}.json`);
    const indices: ISerializedIndice[] = await response.json();
    const indiceInstances = await Promise.all([
        restoreSharedIndices<any, any>({
            id: `data.${id}`,
            baseUrl: `/cdn-indice/${id}`,
            deserializeShared: RangeLinearIndice.lazy,
            deserialize: SimpleIndice.deserialize
        }),
        ...indices.map((indice) => restoreSharedIndices<any, any>({
            id: indice.id,
            baseUrl: `/cdn-indice/${id}`,
            deserializeShared: RangeLinearIndice.lazy,
            deserialize: getLazyIndice(indice)
        }))
    ]);
    const primary = indiceInstances.shift()
    const indiceInstancesMap = new Map(indiceInstances.map((indice) => ([indice.id, indice])));
    console.log(indiceInstancesMap);
    console.log(indices);
    return new Db(
        new Schema(
            primary,
            indices
                .map(
                    indice =>
                        ({ indice: indiceInstancesMap.get(indice.id)!, path: getIndicePath(indice) })
                )
        ));
}