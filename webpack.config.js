var webpack = require('webpack'),
    path = require('path'),
    BrowserSync = require('browser-sync-webpack-plugin'),
    nodeExternals = require('webpack-node-externals');

var isDev = process.env.DB === 'DEV';
var isClientTest = process.env.DB === 'NONE';

var commonPlugins = [
    new webpack.ProvidePlugin({
        'PORT':'apiPort'
    })
]

var devPlugins =([
    new BrowserSync({
            host: 'localhost',
            port: 3001,
            server:{
                baseDir:[__dirname + '/public']
            }
        }) 
]).concat(commonPlugins);

var prodPlugins = ([
    new webpack.optimize.UglifyJsPlugin({
            compressor:{
                warnings: false
            }
        }),
]).concat(commonPlugins);

let externals = isClientTest ? [nodeExternals()] : [];
module.exports = {
    entry:[
        './app/client/app.jsx'
    ],
    externals: externals,
    plugins:isDev ? (!isClientTest ? devPlugins : commonPlugins): prodPlugins,
    output:{
        path:__dirname + '/public',
        filename: 'bundle.js'
    },
    resolve:{
        root: __dirname + '/app/client',
        alias:{
            applicationStyles: 'styles/app.scss',
            apiPort: path.resolve(__dirname, './app/config/apiPort.js')
        },
        extensions: ['', '.js', '.jsx']
    },
    module:{
        loaders:[
            {
                loader: 'babel-loader',
                query:{
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules)/
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : null
    // sassLoader:{
    //     includePaths: [path.resolve(__dirname, './node_modules/foundation-sites/scss')]
    // }
};