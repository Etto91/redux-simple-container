const path = require("path");
const webpack = require("webpack");

const outputPath = process.env.BUILD
    ? path.resolve("./build")
    : path.resolve("./test");

const testConfig = {
    entry: "./src/index.js",
    devtool: "inline-source-map",
    output: {
        path: outputPath,
        filename: "index.js"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                include: [path.resolve("./src")]
            }
        ]
    }
};

const buildConfig = {
    entry: "./src/ReduxSimpleContainer.js",

    output: {
        path: outputPath,
        filename: "redux-simple-container.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                include: [path.resolve("./src")],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        ...(process.env.BUILD
            ? [
                  new webpack.optimize.UglifyJsPlugin({
                      compress: {
                          warnings: false,
                          drop_console: true
                      }
                  })
              ]
            : [])
    ]
};

module.exports = process.env.BUILD ? buildConfig : testConfig;
