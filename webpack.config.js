/* eslint-disable no-undef */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./app/server.js",
	target: "node",
	mode: "production",
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
