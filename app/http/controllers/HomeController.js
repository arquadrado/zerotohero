'use strict'

const pug = require('pug')
const namespace = global.namespace
const Controller = require('./Controller.js')


const HomeController = function () {
    this.home = (callback) => {
    	callback(200, 'text/html', pug.renderFile(namespace.getPath('views', 'home.pug'), {}))
    }
    this.hey = (callback) => {
        callback(200, 'text/html', '<h3><a href="/test">Another route</a></h3>')
    }
}

HomeController.prototype = Controller

module.exports = new HomeController()