'use strict'

const pug = require('pug')
const namespace = global.namespace
const Controller = require('./Controller.js')


const HomeController = function () {
    this.home = () => {
    	
        return {
            status: 200,
            contentType: 'text/html',
            content: pug.renderFile(namespace.getPath('views', 'home.pug'), {
            	
            })
        }
    }
    this.hey = () => {
    	return {
    		status: 200,
    		contentType: 'text/html',
            content: '<h3><a href="/test">Another route</a></h3>'
    	}
    }
}

HomeController.prototype = Controller

module.exports = new HomeController()