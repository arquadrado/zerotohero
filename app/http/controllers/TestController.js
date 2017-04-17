'use strict'

const Controller = require('./Controller.js')

const TestController = function () {
    this.test = (callback) => {

        callback(200, 'text/html', '<h3>Test <a href="/">route</a></h3>')
    }
}

TestController.prototype = Controller

module.exports = new TestController()