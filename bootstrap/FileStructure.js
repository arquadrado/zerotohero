'use strict'

const fs = require('fs'),
    path = require('path')

const Namespace = function (initial) {


    this.getFileStructure = (filename) => {
        const stats = fs.lstatSync(filename)
        const info = {}

            info[path.basename(filename)] = {
                path: filename
            }

        if (stats.isDirectory()) {
            info[path.basename(filename)].type = 'folder'

            info[path.basename(filename)].children = fs.readdirSync(filename).reduce((initial, child) => {

                if (fs.lstatSync(filename + '/' + child).isDirectory()) {

                    Object.assign(initial, this.getFileStructure(`${filename}/${child}`))
                }

                return initial

            }, {})
        }

        return info
    }

    this.structure = this.getFileStructure(initial)

    this.searchFileStructure = (namespace, filename, data = null) => {
        const structure = data === null ? this.structure : data
      
        for (let prop in structure) {
            if (prop !== '.git' && prop !== 'node_modules') {
                if (prop == namespace) {
                    return `${structure[prop].path}/${filename}.js`      
                }
                
                if (Object.keys(structure[prop].children).length !== 0) {
                    return this.searchFileStructure(namespace, filename, structure[prop].children)
                  
                }
            }
        }
    }

    this.get = (namespace, filename) => {
        return this.searchFileStructure(namespace, filename) ? require(this.searchFileStructure(namespace, filename)) : null
    }

}

module.exports = new Namespace(global.appRoot)

