'use strict'

const AnotherMiddleware = function () {
    this.handle = () => {
        console.log('I am another middle fuking ware')
    }
}

module.exports = new AnotherMiddleware()