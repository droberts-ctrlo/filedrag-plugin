const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Buffer: ['buffer', 'Buffer'],
    }),
    new CleanWebpackPlugin(),
]

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        site: path.resolve(__dirname, './src/js/index.ts'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, /test/],
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/,
                type: 'asset',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js'),
        chunkFilename: '[name].[chunkhash].js',
    },

    plugins,

    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src'),
            jQuery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        fallback: {
            'fs': false,
            'buffer': require.resolve('buffer'),
        },
        modules: [
            path.resolve(__dirname, 'src/js'),
            path.resolve(__dirname, 'node_modules'),
        ],
    },

    target: 'web',
}
