// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DisableTreeShakingForChunk = require('disable-tree-shaking-for-chunk-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    entry: {
        blogIndex: glob.sync("./js/blogIndex/**/*.ts").map(file => path.resolve(file)),
        css: glob.sync("./js/css/**/*.ts").map(file => path.resolve(file)).concat(["./src/scss/style.scss"]),
        main: glob.sync("./js/main/**/*.ts").map(file => path.resolve(file)),

    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new DisableTreeShakingForChunk({
            test: "main"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
