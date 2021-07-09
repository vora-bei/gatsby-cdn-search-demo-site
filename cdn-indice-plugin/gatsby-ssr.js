/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
// You can delete this file if you're not using it
const React = require("react")

exports.onRenderBody = ({
  setHeadComponents,
}, pluginOptions) => {
  setHeadComponents([
    <link
      rel="preload"
      href={"/cdn-indice/" + pluginOptions.id + "/indices." + pluginOptions.id + '.json'}
      as="style"
      key={"cdn-base-" + pluginOptions.id}
    />
  ])
}

