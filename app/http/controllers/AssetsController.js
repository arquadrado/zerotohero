'use strict'

const namespace = global.namespace

const fs = require('fs')

const Controller = require('./Controller.js')

const AssetsController = function () {

    //resolves the resource based on the request url and returns the appropriate resource, otherwise it responds with error

    this.getResource = (req, callback) => {

        if (req) {
            const pathname = namespace.getPath(req.url.split('/'))

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

                    }
                })
            })

            return 0
        }

        callback(404, 'text/plain', `File not found!`)

    }

}

AssetsController.prototype = Controller

module.exports = new AssetsController()