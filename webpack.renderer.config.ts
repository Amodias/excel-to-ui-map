import type { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

const tiles = ["tiles"];
const copyPlugins = new CopyWebpackPlugin({
  patterns: tiles.map((asset) => ({
    from: path.resolve(__dirname, "public", asset),
    to: path.resolve(__dirname, ".webpack/renderer", asset),
  })),
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [...plugins, copyPlugins], // Ensure the copy plugin is included in the plugins array
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
