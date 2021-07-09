/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
// You can delete this file if you're not using it
const React = require("react")

const injectScripts = (pluginOptions)=>{
    return  `const __cdn_base_indices_${pluginOptions.id}=${JSON.stringify(pluginOptions.indices)};`
}

exports.onRenderBody = ({
    setHeadComponents,
  }, pluginOptions) => {
    setHeadComponents([
    <script
     key="cdn-base-${pluginOptions.id}"
     dangerouslySetInnerHTML={{__html: injectScripts(pluginOptions)}}
     />
     ])
  }

