'use strict'

const Controller = require('./Controller.js')

const HomeController = function () {
    this.home = () => {
        return {
            status: 200,
            contentType: 'text/html',
            content: '<h3><a href="/test">Home</a></h3>'
        }
    }
}

HomeController.prototype = Controller

module.exports = new HomeController()