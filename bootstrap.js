(function () {

    const path = require('path')
    const webpack = require('webpack')
    const webpackConfig = require('./webpack.config.js')

    webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
           /*console.log(err, stats.toString({
            colors: true
           }), 'erros com fartura')*/
        }
    })

	global.appRoot = path.resolve(__dirname);
	global.namespace = require('./bootstrap/FileStructure.js')

})()