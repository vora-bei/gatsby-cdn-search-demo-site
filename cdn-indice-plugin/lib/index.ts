import * as packageJson from "../package.json";
import { NgramIndice, RangeLinearIndice, SimpleIndice, saveSharedIndices } from 'full-text-search-server-static-index';
import path from 'path'
import fs from "fs";
import { join } from "path";
import util from "util";
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);
const exists = util.promisify(fs.exists);
const DATA_CHUNK_SIZE = 100; 
export interface ISerializedNode {
    [key: string]: any;
}
enum Engine {
    "n-gram" = "n-gram"
}
export interface IOptions {
    id: string;
    siteUrl: string;
    graphQL: string;
    engine: { type: Engine };
    chunkSize: number;
    normalizer: (results: any) => ISerializedNode[];
    idAttr: string;
    dataAttrs: string[];
    indice?: string[];
}

const packageName = (packageJson as any).name;

const getEngine = (engine: { type: Engine }) => {
    const { type, ...options } = engine;
    console.log(Engine["n-gram"]);
    console.log(engine.type);

    if (engine.type === "n-gram") {
        return new NgramIndice(options);
    }
    throw new Error(`Engine ${engine.type} not found`)
}
const serializerData = (data: object, options: IOptions) => {
    return JSON.stringify(data);
    // return JSON.stringify(
    //     options.dataAttrs
    //         .filter(attr => options.idAttr !== attr)
    //         .map(attr => data[attr])
    // )
}

export const buildIndex = async (graphql: any, publicPath: string, options: IOptions) => {
    const { graphQL, normalizer, idAttr, indice, siteUrl, engine, chunkSize, id } = options;
    // @todo check args // some libs 
    const results = await graphql(graphQL);
    if (results.errors) {
        console.error(results.errors);
        throw new Error(`${packageName} had a problem getting results from GraphQL.`);
    }
    if (normalizer) {
        const nodes: ISerializedNode[] = normalizer(results);
        //@todo check is array
        const engine = getEngine(options.engine);
        const simpleEngine = new SimpleIndice({id: `data.${id}`})
        // console.debug(nodes);
        nodes.forEach(node => {
            const id = node[idAttr];
            if (id === undefined) {
                throw new Error(`${packageName} had a problem normalizer results. idAttr is required`);
            }
            const keys = Array.isArray(indice) ? indice : Object.keys(node);
            engine.add(id, keys.map(key => node[key]));
            simpleEngine.add(node, id);
        });
        const publicPath = join(path.resolve("./public"), 'cdn-indice');
        if (await exists(publicPath)) {
            await rmdir(publicPath, { recursive: true });
        }

        const indiceDir = join(publicPath, 'indice');
        if (!await exists(indiceDir)) {
            await mkdir(indiceDir, { recursive: true });
        }

        const rangeIndice = new RangeLinearIndice({ indice: engine, chunkSize, id });
        const dataIndice = new RangeLinearIndice({ indice: simpleEngine, chunkSize: DATA_CHUNK_SIZE, id:`data.${id}` });
        await saveSharedIndices(rangeIndice, indiceDir);
        await saveSharedIndices(dataIndice, indiceDir);
    }


}
