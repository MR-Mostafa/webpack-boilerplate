# <sup>🚀</sup>webpack4 boilerplate
Webpack 4 Boilerplate with Babel, TypeScript, SASS or SCSS, Less, browser autoprefixer, image compressor, dev server and etc.<br>
This is a lightweight foundation for your next webpack based frontend project.

## Setup:
1. git clone https://github.com/MR-Mostafa/webpack4-boilerplate.git
2. run <code>npm install</code> in project folder
3. then select one of these modes to compile your project<br>
    * <code>npm run build:dev</code> for development mode
    * <code>npm run build:prod</code> for production mode
    * <code>npm run watch:dev</code> for development and watch mode (runs on `http://localhost:3000`)
    
## Features:
* ES6 Support via [babel](https://babeljs.io/)
* TypeScript Support via [ts-loader](https://github.com/TypeStrong/ts-loader)
* SASS Support via [sass-loader](https://github.com/webpack-contrib/sass-loader)
* Less Support via [less-loader](https://github.com/webpack-contrib/less-loader)
* Autoprefixer via [autoprefixer](https://github.com/postcss/autoprefixer)
* Linting via [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/)
* image compressor via [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
* Creation of HTML files via [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
* and etc ... 

## Folder Structure:
```
├── webpack.config.js
├── package.json
├── src
|    ├── fonts
|    ├── images
|    ├── js
|    ├── layouts
|    |    ├── index.html (main template)
|    |    └── general
|    |        ├──  style.html (your style)
|    |        └──  script.html (your script)
|    ├── less
|    └── sass
|
└── build
    ├── css
    ├── fonts
    ├── images
    ├── js
    └── index.html
  ```
  
## Auto Creation of HTML files:
We will be using `html-webpack-plugin` for creation of HTML files to serve your webpack bundles. To use this plugin:
- Open the `webpack.config.js` and add the following code to `config.plugins` (on line 147)
- You need to change the values of <strong>template</strong> and <strong>filename</strong>. The rest of the values are created automatically and do not need to be changed in most cases
```js
new HtmlWebpackPlugin({
    template: './src/layouts/index.html',
    filename: 'index.html',
    inject: mode  === 'production' ? false : true,
    chunks: mode  === 'production' ? [] : true,
    excludeChunks: excludeChunks,
    mode: mode,
    staticFile: staticFile,
}),
```

## Other options:
- <strong>RemoveFileAfterBuild</strong> (on line 16)
     * This variable represents the file name in './src/js' that remove after build.
     * With this feature you can delete unnecessary files.
     * this feature works in only 'production' mode
     * e.g: `const RemoveFileAfterBuild = ['file1.js', 'file2.js'];`
     
- <strong>copyStaticFile</strong> (on line 28)
    * If you want to copy a file (files) without changing it during of the build, You must complete this variable.
    * These files are copied to the build folder
    * e.g: 
        ```js
        const copyStaticFile = [
            { from: './src/js/script.js', to: './js/script.js' },
            { from: './src/css/style.css', to: './css/style.css' },
            { from: './src/LICENSE.txt', to: './LICENSE.txt' },
        ];
        ```
        
- <strong>entry</strong> (on line 38)
    * entry webpack (The point or points where to start the application bundling process.)
    * e.g:
        ```js
        const entry = {
            index: './src/js/entry/index.js',
            single: './src/js/entry/single.js',
        };
        ```
        
<strong>Note:</strong> This bundler does not config for react or vue.

## Author:
- [Mostafa Rahmati](https://github.com/MR-Mostafa/)

## License:
`webpack4 boilerplate` released under the [MIT License](https://github.com/MR-Mostafa/webpack4-boilerplate/blob/master/LICENSE)
