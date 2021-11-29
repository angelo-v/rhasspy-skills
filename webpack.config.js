const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    demo: {import: "./skills/demo/src/index.ts", filename:  'skills/[name]/dist/skill.js'},
    "get-time": {import: "./skills/get-time/src/index.ts", filename:  'skills/[name]/dist/skill.js'},
    "shopping-list": {import: "./skills/shopping-list/src/index.ts", filename:  'skills/[name]/dist/skill.js'},
    "weather": {import: "./skills/weather/src/index.ts", filename:  'skills/[name]/dist/skill.js'},
    "static-answer": {import: "./skills/static-answer/src/index.ts", filename:  'skills/[name]/dist/skill.js'},
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  output: {
    path: path.resolve(__dirname, "."),
  }
};
