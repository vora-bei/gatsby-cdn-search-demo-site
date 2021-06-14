import * as packageJson from "../package.json";
import { NgramIndice, RangeLinearIndice, saveSharedIndices } from 'full-text-search-server-static-index';
import path from 'path'
import fs from "fs";
import { join } from "path";
import util from "util";
const LIMIT_SAVE_FILE = 500;
const writeFile = util.promisify(fs.writeFile);

const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);
const exists = util.promisify(fs.exists);
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
        // console.debug(nodes);
        nodes.forEach(node => {
            const id = node[idAttr];
            if (!id) {
                throw new Error(`${packageName} had a problem normalizer results. idAttr is required`);
            }
            const keys = Array.isArray(indice) ? indice : Object.keys(node);
            engine.add(id, keys.map(key => node[key]))
        });
        const publicPath = join(path.resolve("./public"), 'cdn-indice');
        if (await exists(publicPath)) {
            await rmdir(publicPath, { recursive: true });
        }
        if (!await exists(publicPath)) {
            await mkdir(publicPath, { recursive: true });
        }
        const dataDir = join(publicPath, 'data');
        const indiceDir = join(publicPath, 'indice');
        if (!await exists(indiceDir)) {
            await mkdir(indiceDir, { recursive: true });
        }
        if (!await exists(join(dataDir, id))) {
            await mkdir(join(dataDir, id), { recursive: true });
        }
        const rangeIndice = new RangeLinearIndice({ indice: engine, chunkSize, id });
        for (let i = 0; i < nodes.length / LIMIT_SAVE_FILE; i++) {
            try {
                await Promise.all(nodes.slice(i * LIMIT_SAVE_FILE, (i + 1) * (LIMIT_SAVE_FILE))
                    .map(node =>
                        writeFile(join(dataDir, rangeIndice.id, `n.${node[idAttr]}.json`), JSON.stringify(node))
                    ));
            } catch (e) {
                console.log(e);
            }

        }
        await saveSharedIndices(rangeIndice, indiceDir);
    }


}
