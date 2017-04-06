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

    this.getNestedProperty = (namespace, data) => {

        return namespace.reduce((final, prop) => {


            final = final ? final.children[prop] : data[prop]

            return final

        }, null)
    }

    this.searchFileStructure = (namespace, filename, data = null) => {
        const structure = data === null ? this.getFileStructure(initial) : data
        const parsedNamespace = namespace.split('.')



        for (let prop in structure) {

            if (prop !== '.git' && prop !== 'node_modules') {

                if (parsedNamespace.length == 1 && structure[prop].children.hasOwnProperty(parsedNamespace[0])) {

                    return `${structure[prop].children[parsedNamespace[0]].path}/${filename}.js`
                }

                if (prop == parsedNamespace[0]) {
                    if (parsedNamespace.length == 1) {
                        return `${structure[prop].path}/${filename}.js`
                    }

                    const result = this.getNestedProperty(parsedNamespace, structure[prop].children)

                    if (result) {
                        return `${result.path}/${filename}.js`
                    }

                }

                if (Object.keys(structure[prop].children).length !== 0) {
                    const fetchedPath = this.searchFileStructure(namespace, filename, structure[prop].children)

                    if (fetchedPath) {
                        return fetchedPath
                    }

                }
            }
        }
    }

    this.get = (namespace, filename) => {
        return this.searchFileStructure(namespace, filename) ? require(this.searchFileStructure(namespace, filename)) : null
    }


}

module.exports = new Namespace(global.appRoot)

