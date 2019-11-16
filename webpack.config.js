const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveBuildFile = require('remove-files-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

/**
 *
 * This variable represents the options of the 'postcss-base64' plugin, which is used in the 'postcss-loader' loader
 * To convert photos and font to data-uri code, it's enough to end the file name to '.b64.[ext]'
 * In other words, photos and fonts will not normally be converted to data-uri unless
 * the final portion of the file name is terminated to '.b64.[ext]'
 */
const base64Options = {
	extensions: ['.b64.jpg', '.b64.jpeg', '.b64.png', '.b64.svg', '.b64.woff', '.b64.woff2'],
	root: './src/**',
	excludeAtFontFace: false,
};

/**
 * This variable represents the file name in './src/js' that remove after buile.
 * With this feature you can delete unnecessary files.
 * this plugin works in 'production' mode
 */
const RemoveFileAfterBuild = [];

/**
 * This variable represents the mode configuration of the plugin 'HtmlWebpackPlugin'
 * If is equal 'development', It will not import css files into html output.
 */
const HtmlWebpackPlugin_mode = 'development';

/**
 *
 * These config are used for both development and production modes
 *
 */
const config = {
	entry: {
		// main: './src/js/main.js',
		font: './src/js/base/font.js',
		// Insert other script files here ...
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].js',
	},

	stats: 'errors-warnings',

	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		index: 'index.html',
		compress: true,
		port: 3000,
		stats: {
			assets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			colors: true,
			entrypoints: false,
			hash: false,
			modules: false,
			timings: false,
			version: false,
			logging: 'warn',
		},
	},

	module: {
		/**
		 * Loaders are evaluated/executed from right to left (or from bottom to top)
		 */
		rules: [],
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Roocket Page',
			template: './src/layouts/template/main.html',
			filename: 'index.html',
			inject: false,
			chunks: [],
			themeSetting: {
				isDevelopment: HtmlWebpackPlugin_mode,
				fontface: true,
				body: {
					classes: '',
				},
			},
			files: {
				styles: [],
				scripts: [],
			},
		}),

		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ['Your application is running here http://localhost:3000'],
			},
		}),

		/**
		 * All files inside webpack's output.path directory will be removed once, but the
		 * directory itself will not be.
		 */
		new CleanWebpackPlugin(),
	],
};

/**
 *
 *  These settings are based on the specific mode type
 *
 */
module.exports = (env, { mode }) => {
	/**
	 * return true or false if mode is development or Prodoction.
	 */
	const isDevelopment = mode === 'development';

	/**
	 * Development Mode
	 */
	if (isDevelopment) {
		config.module.rules.push(
			...[
				{
					// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
					test: /\.tsx?$/,
					exclude: /(node_modules|webpack-plugins)/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
							},
						},
					],
				},
			]
		);
	}

	config.module.rules.push(
		...[
			{
				// Apply rule for .css files
				test: /\.css$/,
				use: [
					{
						// extracts CSS into separate files
						loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					{
						// Translates CSS into CommonJS
						loader: 'css-loader',
						options: isDevelopment ? { sourceMap: true } : {},
					},
					{
						// In development mode the 'postcss-base64' plugin is used
						// In production mode the 'autoprefixer', 'cssnano' & 'postcss-base64' plugins are used
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: isDevelopment ? true : false,
							plugins: loader =>
								isDevelopment
									? [require('postcss-base64')(base64Options)]
									: [
											require('autoprefixer'),
											require('cssnano')({
												preset: 'default',
											}),
											require('postcss-base64')(base64Options),
									  ],
						},
					},
				],
			},
			{
				// Apply rule for .sass, .scss files and compiles it to CSS
				test: /\.s[ac]ss$/,
				use: [
					{
						// extracts CSS into separate files
						loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					{
						// Translates CSS into CommonJS
						loader: 'css-loader',
						options: isDevelopment ? { sourceMap: true } : {},
					},
					{
						// In production mode the 'autoprefixer' plugin is used
						// And in both mode (production and development) the 'cssnano' & 'postcss-base64' plugins are used.
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: isDevelopment ? true : false,
							plugins: loader =>
								isDevelopment
									? [require('postcss-base64')(base64Options)]
									: [
											require('autoprefixer'),
											require('cssnano')({
												preset: 'default',
											}),
											require('postcss-base64')(base64Options),
									  ],
						},
					},
					{
						// Compiles Sass to CSS
						loader: 'sass-loader',
						options: isDevelopment ? { sourceMap: true } : {},
					},
				],
			},
			{
				// Apply rule for .less files and compiles it to CSS
				test: /\.less$/,
				use: [
					{
						// extracts CSS into separate files
						loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					{
						// Translates CSS into CommonJS
						loader: 'css-loader',
						options: isDevelopment ? { sourceMap: true } : {},
					},
					{
						// In production mode the 'autoprefixer' plugin is used
						// And in both mode (production and development) the 'cssnano' & 'postcss-base64' plugins are used.
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: isDevelopment ? true : false,
							plugins: loader =>
								isDevelopment
									? [require('postcss-base64')(base64Options)]
									: [
											require('autoprefixer'),
											require('cssnano')({
												preset: 'default',
											}),
											require('postcss-base64')(base64Options),
									  ],
						},
					},
					{
						// Compiles less to CSS
						loader: 'less-loader',
						options: isDevelopment ? { sourceMap: true } : {},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: isDevelopment ? './images' : '../images',
							outputPath: 'images',
							name: '[name].[ext]',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							// This loader will be disabled when in development mode. (Images cannot be compressed and optimized)
							disable: isDevelopment,
							mozjpeg: {
								progressive: true,
								quality: 70,
							},
							optipng: {
								enabled: true,
							},
							pngquant: {
								quality: [0.7, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 80,
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|eot|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: isDevelopment ? './fonts' : '../fonts',
							outputPath: 'fonts',
							name: '[name].[ext]',
						},
					},
				],
			},
		]
	);

	/**
	 * Prodoction Mode
	 */
	if (!isDevelopment) {
		config.module.rules.push(
			...[
				{
					test: /\.js$/,
					exclude: /(node_modules|webpack-plugins)/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							plugins: [
								'@babel/plugin-transform-classes',
								'@babel/plugin-transform-arrow-functions',
								'@babel/plugin-transform-shorthand-properties',
								'@babel/plugin-transform-spread',
							],
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											chrome: '55',
											firefox: '55',
											safari: '11',
											edge: '14',
										},
									},
								],
							],
						},
					},
				},
				{
					// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
					test: /\.tsx?$/,
					exclude: /(node_modules|webpack-plugins)/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								// cacheDirectory: true,
								plugins: [
									'@babel/plugin-transform-classes',
									'@babel/plugin-transform-arrow-functions',
									'@babel/plugin-transform-shorthand-properties',
									'@babel/plugin-transform-spread',
								],
								presets: [
									[
										'@babel/preset-env',
										{
											targets: {
												chrome: '55',
												firefox: '55',
												safari: '11',
												edge: '14',
											},
										},
									],
								],
							},
						},
						{
							loader: 'ts-loader',
						},
					],
				},
			]
		);

		config.plugins.push(
			...[
				new RemoveBuildFile({
					after: {
						root: './build/js',
						include: RemoveFileAfterBuild,
						allowRootAndOutside: true,
					},
				}),

				/**
				 * This plugin extracts CSS into separate files.
				 * It creates a CSS file per JS file which contains CSS.
				 */
				new MiniCssExtractPlugin({
					filename: 'css/[name].css',
				}),
			]
		);
	}

	return config;
};
