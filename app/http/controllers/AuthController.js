'use strict'

const pug = require('pug')
const namespace = global.namespace
const Controller = require('./Controller.js')


const AuthController = function () {
    this.login = (req, callback) => {
    	callback(200, 'text/html', pug.renderFile(namespace.getPath('views.auth', 'login.pug'), {}))
    }
}

AuthController.prototype = Controller

module.exports = new AuthController()


