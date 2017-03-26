(function () {
	console.log('bootstrapping')

	const path = require('path');

	global.appRoot = path.resolve(__dirname);
	global.namespace = require('./bootstrap/FileStructure.js')
	
})()