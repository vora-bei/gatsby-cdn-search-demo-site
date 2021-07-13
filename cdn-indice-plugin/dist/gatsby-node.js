"use strict";
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it
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
/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = function (_, pluginOptions) { return console.log("Loaded gatsby-starter-plugin"); };
var path = require("path");
var buildIndex = require("./lib/index").buildIndex;
var executions = new Set();
exports.createPages = function (_a, pluginOptions) {
    var graphql = _a.graphql;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    delete pluginOptions.plugins;
                    if (!!executions.has(pluginOptions.id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, buildIndex(graphql, pluginOptions)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    executions.add(pluginOptions.id);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.pluginOptionsSchema = function (_a) {
    var Joi = _a.Joi;
    return Joi.object({
        // Validate that the anonymize option is defined by the user and is a boolean
        idAttr: Joi.string().required(),
        id: Joi.string().required(),
        dataAttrs: Joi.array(),
        graphQL: Joi.string().required(),
        chunkSize: Joi.number(),
        normalizer: Joi.function().required(),
        indices: Joi.array().items(Joi.object({
            id: Joi.string().required(),
            column: Joi.string(),
            columns: Joi.array().items(Joi.string()),
            type: Joi.string(),
            actuationLimit: Joi.number(),
            actuationLimitAuto: Joi.boolean(),
            gramLen: Joi.number(),
            toLowcase: Joi.boolean(),
        }).or('column', 'columns')),
    });
};
exports.onCreateWebpackConfig = function (_a) {
    var replaceWebpackConfig = _a.actions.replaceWebpackConfig, getConfig = _a.getConfig;
    var config = getConfig();
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'workerize-loader' }
    });
    config.output.globalObject = 'this';
    replaceWebpackConfig(config);
};
//# sourceMappingURL=gatsby-node.js.map