require('dotenv').load();
var webpack = require("webpack");
var path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
    target: "node",
    externals: nodeModules,
    node: {
      __dirname: true
    },
    entry: ["server"],
    resolve: {
        root: [ path.resolve("./src") ],
        extensions: ["", ".js"]
    },
    output: {
        path: "./",
        filename: "server.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/, loader: "json-loader"
            },
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT),
            __MONGO_URL__: JSON.stringify(process.env.MONGO_URL)
        })
    ]
}
