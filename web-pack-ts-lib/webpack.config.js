const path = require('path');

module.exports = {
	mode: 'development',
	entry: './Scripts/Build/Temp/Rush/main.js',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
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
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, './Scripts/Build/Rush'),
		filename: 'bundle.js',
		libraryTarget: 'var',
		library: 'RushWB'
	},
	externals: {
		"knockout": "ko",
		"jquery":"$"
	}
};