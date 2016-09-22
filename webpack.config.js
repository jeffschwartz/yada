var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "scripts/public");
var APP_DIR = path.resolve(__dirname, "scripts/app");

module.exports = {
    entry: APP_DIR + "/yada.js",
    output: {
        path: BUILD_DIR,
        filename: "app.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: APP_DIR,
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

