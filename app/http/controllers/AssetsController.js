'use strict'

const namespace = global.namespace

const fs = require('fs')

const Controller = require('./Controller.js')

const AssetsController = function () {
    this.scripts = () => {

        const pathname = namespace.getPath('build', 'bundle') 


        fs.exists(pathname, function (exist) {

            if(!exist || fs.statSync(pathname).isDirectory()) {

              return {
                    status: 404,
                    contentType: 'text/plain',
                    content: `File ${pathname} not found!`
                }
            }
            
            // read file from file system
            fs.readFile(pathname, function(err, data){
                if(err){
                    return {
                        status: 500,
                        contentType: 'text/plain',
                        content: `Error getting the file: ${err}.`
                    }
                
                } else {
                    return {
                        status: 200,
                        contentType: 'application/javascript',
                        content: data
                    }                
                
                }
            })
        })
        
    }
   
}

AssetsController.prototype = Controller

module.exports = new AssetsController()