import * as webpack from 'webpack';

export interface ICommonConfigFactoryParams {
    isProduction: boolean;
}

export type IWebpackConfigFactory = (params: ICommonConfigFactoryParams) => webpack.Configuration;
