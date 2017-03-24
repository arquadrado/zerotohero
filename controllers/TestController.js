'use strict'

const Controller = require('./Controller.js')

const TestController = function () {
    this.test = () => {
        return {
            status: 200,
            contentType: 'text/html',
            content: '<h3>Test <a href="/">route</a></h3>'
        }
    }
}

TestController.prototype = Controller

module.exports = new TestController()