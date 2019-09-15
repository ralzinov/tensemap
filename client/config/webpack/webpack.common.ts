import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {IWebpackConfigFactory} from './interfaces';

const currentdir = process.cwd();

export const commonConfigFactory: IWebpackConfigFactory = ({isProduction}) => ({
    mode: isProduction ? 'production' : 'development',
    entry: [
        path.join(currentdir, './src/index.ts')
    ],
    output: {
        filename: 'main.bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.join(currentdir, './dist'),
        publicPath: '/'
    },
    context: currentdir,
    resolve: {
        modules: [currentdir, path.resolve(currentdir, 'node_modules'), 'node_modules'],
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.html/,
                use: 'raw-loader',
                exclude: path.join(currentdir, './src/index.html')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                            reloadAll: true // if hmr does not work, this is a forceful method.
                        }
                    },
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(currentdir, './src/index.html'),
            // favicon: path.join(currentdir, './src/assets/favicon.png'),
            inject: 'body',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].styles.css'
        })
    ]
});
