import type { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import fs from "fs";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

// Add rules for CSS
rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

// Function to get all font files from the fonts directory
const getFontFiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".pbf"));
};

const fontsDir = path.resolve(__dirname, "public/fonts");
const fontFiles = getFontFiles(fontsDir);

const copyPlugins = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "public", "zurich_switzerland.mbtiles"),
      to: path.resolve(
        __dirname,
        ".webpack/main/public",
        "zurich_switzerland.mbtiles"
      ),
    },
    ...fontFiles.map((font) => ({
      from: path.resolve(fontsDir, font),
      to: path.resolve(__dirname, ".webpack/main/public/fonts", font),
    })),
    {
      from: path.resolve(__dirname, "public", "style.json"),
      to: path.resolve(__dirname, ".webpack/main/public", "style.json"),
    },
    {
      from: path.resolve(__dirname, "public", "v3.json"),
      to: path.resolve(__dirname, ".webpack/main/public", "v3.json"),
    },
  ],
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
