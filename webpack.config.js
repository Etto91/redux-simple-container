const path = require("path");

const outputPath = path.resolve("./demo-build");

const testConfig = {
    mode: "development",
    entry: "./demo/index.js",
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
                include: [path.resolve("./demo")]
            }
        ]
    }
};

module.exports = testConfig;
