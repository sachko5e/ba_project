const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const execSync = require('child_process').execSync;
// const CURRENT_BRANCH_NAME = (process.env.BRANCH_NAME) ? process.env.BRANCH_NAME : execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[name].js'
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@common': path.resolve(__dirname, 'src/common'),
            '@components': path.resolve(__dirname, 'src/common/components')
        },
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|public_libs)/,
                // query: {
                //     presets: ['react', 'es2015', 'stage-1'],
                //     plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']

                // }
            },
            // Extract css files
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
                // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            // Optionally extract less files
            // or any other compile-to-css language
            // {
            //     test: /\.less$/,
            //     loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'less-loader' })
            //     // You could also use other loaders the same way. I. e. the autoprefixer-loader
            // },
            // { node-sass cannot be installed through jenkins.
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','sass-loader'] })
            //     // You could also use other loaders the same way. I. e. the autoprefixer-loader
            // },
            {
                test: /\.(png|jpg|svg|gif|pdf)$/,
                loader: "file-loader"
                , options: {
                    name: "[name].[ext]",
                    publicPath: 'dist/'
                }
            }

        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles.[name].css' }),
        new webpack.ProvidePlugin({
            ReactDOM: 'react-dom',
            React: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                QZLANE: JSON.stringify(process.env.NODE_ENV || 'uat')
            }
        })
    ]
}

