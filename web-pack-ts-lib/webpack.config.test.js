const path = require('path');

module.exports = {
    mode: 'development',
    entry: './Scripts/ES6/Rush/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
        colors: true
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './Scripts/Build/Rush'),
        filename: 'bundle.test.js',
    },
};