import 'webpack-dev-server';
import * as path from 'path';
import * as webpack from 'webpack';
import {commonConfigFactory} from './webpack.common';
const currentdir = process.cwd();

const devConfig: webpack.Configuration = {
    ...commonConfigFactory({
        isProduction: true
    }),
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        https: true,
        compress: true,
        port: 443,
        host: 'tensemap.lan',
        historyApiFallback: true,
        contentBase: path.join(currentdir, './dist'),
        inline: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/',
                secure: false
            }
        }
    }
};

export default devConfig;
