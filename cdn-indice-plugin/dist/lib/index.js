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
var browser_1 = require("../browser");
var mkdir = util_1.default.promisify(fs_1.default.mkdir);
var rmdir = util_1.default.promisify(fs_1.default.rmdir);
var exists = util_1.default.promisify(fs_1.default.exists);
var writeFile = util_1.default.promisify(fs_1.default.writeFile);
var packageName = packageJson.name;
var buildIndex = function (graphql, options) { return __awaiter(void 0, void 0, void 0, function () {
    var graphQL, normalizer, idAttr, indices, chunkSize, id, results, nodes, simpleEngine_1, instanceIndices_1, publicPath, indiceDir_1, dataIndice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphQL = options.graphQL, normalizer = options.normalizer, idAttr = options.idAttr, indices = options.indices, chunkSize = options.chunkSize, id = options.id;
                return [4 /*yield*/, graphql(graphQL)];
            case 1:
                results = _a.sent();
                if (results.errors) {
                    console.error(results.errors);
                    throw new Error(packageName + " had a problem getting results from GraphQL.");
                }
                if (!normalizer) return [3 /*break*/, 9];
                nodes = normalizer(results);
                simpleEngine_1 = new full_text_search_server_static_index_1.SimpleIndice({ id: "data." + id });
                instanceIndices_1 = indices.map(function (_a) {
                    var id = _a.id, column = _a.column, columns = _a.columns, options = __rest(_a, ["id", "column", "columns"]);
                    return { indice: browser_1.getIndice(options), columns: columns ? columns : [column], id: id };
                });
                nodes.forEach(function (node) {
                    var id = node[idAttr];
                    if (id === undefined) {
                        throw new Error(packageName + " had a problem normalizer results. idAttr is required");
                    }
                    instanceIndices_1.forEach(function (_a) {
                        var indice = _a.indice, columns = _a.columns;
                        indice.add(id, columns.map(function (key) { return node[key]; }));
                    });
                    simpleEngine_1.add(node, id);
                });
                publicPath = path_2.join(path_1.default.resolve("./public"), 'cdn-indice');
                indiceDir_1 = path_2.join(publicPath, id);
                return [4 /*yield*/, exists(indiceDir_1)];
            case 2:
                if (!_a.sent()) return [3 /*break*/, 4];
                return [4 /*yield*/, rmdir(indiceDir_1, { recursive: true })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, mkdir(indiceDir_1, { recursive: true })];
            case 5:
                _a.sent();
                return [4 /*yield*/, Promise.all(instanceIndices_1.map(function (_a) {
                        var indice = _a.indice, id = _a.id;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var rangeIndice;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        rangeIndice = new full_text_search_server_static_index_1.RangeLinearIndice({ indice: indice, chunkSize: chunkSize, id: id });
                                        return [4 /*yield*/, full_text_search_server_static_index_1.saveSharedIndices(rangeIndice, indiceDir_1)];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }))];
            case 6:
                _a.sent();
                dataIndice = new full_text_search_server_static_index_1.RangeLinearIndice({ indice: simpleEngine_1, chunkSize: chunkSize, id: "data." + id });
                return [4 /*yield*/, writeFile(path_2.join(indiceDir_1, "indices." + id + ".json"), JSON.stringify(indices))];
            case 7:
                _a.sent();
                return [4 /*yield*/, full_text_search_server_static_index_1.saveSharedIndices(dataIndice, indiceDir_1)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.buildIndex = buildIndex;
//# sourceMappingURL=index.js.map