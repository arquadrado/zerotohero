'use strict'

const TestMiddleware = function () {
    this.handle = () => {
        console.log('I am middlewaring this shit originally')
    }
}

module.exports = new TestMiddleware()