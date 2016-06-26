/* global __dirname */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devTool: "source-map",
    devServer: {
        host: "localhost",
        port: "8080",
        contentBase: "www/",
        colors: true,
        inline: true,
        hot: true
    },
    entry: {
        'www/bundle': ['./src/index']
    },
    resolve: {
        root: [ path.resolve("./src") ],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: './',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass!autoprefixer!'
            },
            {
                test: /\.jsx?/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development'))
        })
    ]
}
