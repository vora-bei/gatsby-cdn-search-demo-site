"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
// You can delete this file if you're not using it
var React = require("react");
exports.onRenderBody = function (_a, pluginOptions) {
    var setHeadComponents = _a.setHeadComponents;
    setHeadComponents(__spreadArray([
        <link rel="prefetch" type="application/json" href={"/cdn-indice/" + pluginOptions.id + "/indices." + pluginOptions.id + '.json'} as="fetch" crossorigin="anonymous" key={"cdn-base-" + pluginOptions.id}/>,
        <link rel="prefetch" type="application/json" href={"/cdn-indice/" + pluginOptions.id + "/data." + pluginOptions.id + '/index.json'} as="fetch" crossorigin="anonymous" key={"cdn-base-" + pluginOptions.id}/>
    ], __read(pluginOptions.indices.map(function (_a) {
        var id = _a.id;
        return <link rel="prefetch" type="application/json" href={"/cdn-indice/" + pluginOptions.id + "/" + id + '/index.json'} as="fetch" crossorigin="anonymous" key={"cdn-base-" + pluginOptions.id}/>;
    }))));
};
//# sourceMappingURL=gatsby-ssr.js.map