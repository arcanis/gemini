const ForkTsCheckerWebpackPlugin = require(`fork-ts-checker-webpack-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);


const posix = require(`path`);
const webpack = require(`webpack`);

module.exports = (env, argv) => {
  const PUBLIC_PATH = true || argv.mode === `production`
    ? `/gemini/`
    : `/`;

  return {
    context: __dirname,
    entry: `./sources/index`,

    mode: `development`,

    node: {
      fs: `empty`,
    },

    output: {
      path: posix.resolve(__dirname, `../../docs`),
      publicPath: PUBLIC_PATH,
    },

    module: {
      rules: [{
        test: /\.wasm$/,
        type: `javascript/auto`,
        loader: `file-loader`,
      }, {
        test: /\.db$/,
        loader: `file-loader`,
      }, {
        test: /\.tsx?$/,
        loader: `ts-loader`,
        options: PnpWebpackPlugin.tsLoaderOptions({
          transpileOnly: true,
        }),
      }, {
        test: /\.less$/,
        use: [{
          loader: `style-loader`,
        }, {
          loader: `css-loader`,
        }, {
          loader: `less-loader`,
        }],
      }, {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: `css-loader`,
        }],
      }, {
        test: /\.png$/,
        use: [{
          loader: `file-loader`,
        }],
      }],
    },

    resolve: {
      extensions: [`.ts`, `.tsx`, `.js`, `.json`],
      plugins: [
        PnpWebpackPlugin,
      ],
    },

    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },

    plugins: [
      new webpack.DefinePlugin({PUBLIC_PATH: JSON.stringify(PUBLIC_PATH)}),
      new ForkTsCheckerWebpackPlugin(PnpWebpackPlugin.forkTsCheckerOptions()),
      new HtmlWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: `404.html`,
        template: `./sources/404.html`,
        publicPath: PUBLIC_PATH,
      }),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
        chunkFilename: `[id].css`,
      }),
    ],

    devServer: {
      historyApiFallback: {
        rewrites: [
          {from: /^\//, to: `${PUBLIC_PATH}index.html`},
        ],
      },
    },
  };
};
