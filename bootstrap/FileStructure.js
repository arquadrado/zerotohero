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

                    Object.assign(initial, this.getFileStructure(filename + '/' + child))
                }

                return initial

            }, {})
        }

        return info
    }

    this.structure = this.getFileStructure(initial)

    this.get = function (namespace, file, level) {
        const structure = level ? this.structure[level[0]] : this.structure
        for (let prop in structure) {
            if (prop === namespace) {
                return `${structure[namespace].path}/${file}.js`
            }
            console.log(structure, 'structure');
            /*if (structure[namespace].children) {
                level.push(prop)
                this.get(namespace, file, level)
            }*/
        }
    }

}

module.exports = new Namespace(global.appRoot)

