module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist/',
    },
    devServer: {
        contentBase: 'static',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/src/',
                loader: 'babel-loader',
            }
        ]
    },
}
