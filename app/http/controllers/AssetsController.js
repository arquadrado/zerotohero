'use strict'

const namespace = global.namespace

const fs = require('fs')

const Controller = require('./Controller.js')

const AssetsController = function () {
    this.scripts = (callback) => {

        const pathname = namespace.getPath('build', 'bundle')

        fs.exists(pathname, function (exist) {

            if(!exist || fs.statSync(pathname).isDirectory()) {

                callback(404, 'text/plain', `File ${pathname} not found!`)
            }

            // read file from file system
            fs.readFile(pathname, function(err, data){
                if(err){
                    callback(500, 'text/plain', `Error getting the file: ${err}.`)

                } else {

                    callback(200, 'application/javascript', data)
                    /*return {
                        status: 200,
                        contentType: 'application/javascript',
                        content: data
                    }*/

                }
            })
        })

    }

}

AssetsController.prototype = Controller

module.exports = new AssetsController()