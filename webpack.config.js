const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const outputPath = process.env.BUILD
    ? path.resolve("./build")
    : path.resolve("./test");

const testConfig = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    externals: "./build/redux-simple-container.js",
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
    mode: "production",
    output: {
        path: outputPath,
        filename: "redux-simple-container.js",
        libraryTarget: "commonjs2"
    },
    externals: ["react", "react-dom"],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                exclude: /(node_modules)/
            }
        ]
    }
};

module.exports = process.env.BUILD ? buildConfig : testConfig;
