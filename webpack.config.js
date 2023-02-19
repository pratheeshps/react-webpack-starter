const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let mode = "development";
let target = "web";
let devtool;

const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        hash: true,
    }),
    new webpack.BannerPlugin({
        banner: new Date().toDateString(),
    }),
];

let optimization;

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
    optimization = {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2,
                },
            },
        },
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    };
} else if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
    devtool = "source-map";
} else {
    devtool = "source-map";
    plugins.push(
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
        })
    );
}
module.exports = {
    mode,
    target,

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash].js",
        assetModuleFilename: "images/[name]-[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                use: [
                    {
                        loader: "image-webpack-loader",
                        options: {
                            pngquant: {
                                quality: [0.9, 0.95],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(le|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins,
    ...(optimization && { optimization }),
    resolve: {
        extensions: [".js", ".jsx"],
    },
    ...(devtool && { devtool }),
    devServer: {
        static: "./dist",
        hot: true,
    },
};
