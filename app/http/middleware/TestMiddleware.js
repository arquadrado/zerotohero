'use strict'

const TestMiddleware = function () {
    this.handle = () => {
        console.log('I am middlewaring this shit')
    }
}

module.exports = new TestMiddleware()