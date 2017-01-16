var webpack = require("webpack");
var path = require("path");

// var PUBLIC_DIR = path.resolve(__dirname, "public");
var SOURCE_DIR = path.resolve(__dirname, "scripts/app");
var BUILD_DIR = path.resolve(__dirname, "public/script");

module.exports = {
    entry: SOURCE_DIR + "/yada.js",
    output: {
        path: BUILD_DIR,
        // publicPath: PUBLIC_DIR,
        filename: "app.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: SOURCE_DIR,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    resolve: {
        extensions: ["", ".js"]
    },
    // Configure webpack to import React when it is referenced
    // in a module that doesn't explicitly import it
    // (e.g. stateless component functions)
    plugins: [
        new webpack.ProvidePlugin({
            // "React": "react"
        })
    ]
};

