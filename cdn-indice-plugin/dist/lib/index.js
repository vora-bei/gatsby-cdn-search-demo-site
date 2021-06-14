"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIndex = void 0;
var packageJson = __importStar(require("../package.json"));
var full_text_search_server_static_index_1 = require("full-text-search-server-static-index");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var path_2 = require("path");
var util_1 = __importDefault(require("util"));
var LIMIT_SAVE_FILE = 500;
var writeFile = util_1.default.promisify(fs_1.default.writeFile);
var mkdir = util_1.default.promisify(fs_1.default.mkdir);
var rmdir = util_1.default.promisify(fs_1.default.rmdir);
var exists = util_1.default.promisify(fs_1.default.exists);
var Engine;
(function (Engine) {
    Engine["n-gram"] = "n-gram";
})(Engine || (Engine = {}));
var packageName = packageJson.name;
var getEngine = function (engine) {
    var type = engine.type, options = __rest(engine, ["type"]);
    console.log(Engine["n-gram"]);
    console.log(engine.type);
    if (engine.type === "n-gram") {
        return new full_text_search_server_static_index_1.NgramIndice(options);
    }
    throw new Error("Engine " + engine.type + " not found");
};
var buildIndex = function (graphql, publicPath, options) { return __awaiter(void 0, void 0, void 0, function () {
    var graphQL, normalizer, idAttr, indice, siteUrl, engine, chunkSize, id, results, nodes, engine_1, publicPath_1, dataDir_1, indiceDir, rangeIndice_1, i, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphQL = options.graphQL, normalizer = options.normalizer, idAttr = options.idAttr, indice = options.indice, siteUrl = options.siteUrl, engine = options.engine, chunkSize = options.chunkSize, id = options.id;
                return [4 /*yield*/, graphql(graphQL)];
            case 1:
                results = _a.sent();
                if (results.errors) {
                    console.error(results.errors);
                    throw new Error(packageName + " had a problem getting results from GraphQL.");
                }
                if (!normalizer) return [3 /*break*/, 21];
                nodes = normalizer(results);
                engine_1 = getEngine(options.engine);
                // console.debug(nodes);
                nodes.forEach(function (node) {
                    var id = node[idAttr];
                    if (id === undefined) {
                        throw new Error(packageName + " had a problem normalizer results. idAttr is required");
                    }
                    var keys = Array.isArray(indice) ? indice : Object.keys(node);
                    engine_1.add(id, keys.map(function (key) { return node[key]; }));
                });
                publicPath_1 = path_2.join(path_1.default.resolve("./public"), 'cdn-indice');
                return [4 /*yield*/, exists(publicPath_1)];
            case 2:
                if (!_a.sent()) return [3 /*break*/, 4];
                return [4 /*yield*/, rmdir(publicPath_1, { recursive: true })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, exists(publicPath_1)];
            case 5:
                if (!!(_a.sent())) return [3 /*break*/, 7];
                return [4 /*yield*/, mkdir(publicPath_1, { recursive: true })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                dataDir_1 = path_2.join(publicPath_1, 'data');
                indiceDir = path_2.join(publicPath_1, 'indice');
                return [4 /*yield*/, exists(indiceDir)];
            case 8:
                if (!!(_a.sent())) return [3 /*break*/, 10];
                return [4 /*yield*/, mkdir(indiceDir, { recursive: true })];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [4 /*yield*/, exists(path_2.join(dataDir_1, id))];
            case 11:
                if (!!(_a.sent())) return [3 /*break*/, 13];
                return [4 /*yield*/, mkdir(path_2.join(dataDir_1, id), { recursive: true })];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13:
                rangeIndice_1 = new full_text_search_server_static_index_1.RangeLinearIndice({ indice: engine_1, chunkSize: chunkSize, id: id });
                i = 0;
                _a.label = 14;
            case 14:
                if (!(i < nodes.length / LIMIT_SAVE_FILE)) return [3 /*break*/, 19];
                _a.label = 15;
            case 15:
                _a.trys.push([15, 17, , 18]);
                return [4 /*yield*/, Promise.all(nodes.slice(i * LIMIT_SAVE_FILE, (i + 1) * (LIMIT_SAVE_FILE))
                        .map(function (node) {
                        return writeFile(path_2.join(dataDir_1, rangeIndice_1.id, "n." + node[idAttr]), JSON.stringify(node));
                    }))];
            case 16:
                _a.sent();
                return [3 /*break*/, 18];
            case 17:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 18];
            case 18:
                i++;
                return [3 /*break*/, 14];
            case 19: return [4 /*yield*/, full_text_search_server_static_index_1.saveSharedIndices(rangeIndice_1, indiceDir)];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [2 /*return*/];
        }
    });
}); };
exports.buildIndex = buildIndex;
//# sourceMappingURL=index.js.map