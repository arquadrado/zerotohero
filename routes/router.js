'use strict'

const namespace = global.namespace

const routes = require('./web.js')

const Router = function () {

    this.handle = (req, res) => {

        if (routes.hasOwnProperty(req.url)) {

            this.middleware(req)

            const controller = namespace.get('controllers', routes[req.url]['controller'])
            const method = routes[req.url]['method']

            if (controller.hasOwnProperty(method)) {

                controller[method](req, (status, contentType, data) => {
                    res.statusCode = status
                    res.setHeader('Content-Type', contentType)
                    res.end(data)

                })

                return 0
            }

            throw new Error('Invalid request')

        }
    }

    this.middleware = (req) => {

        if (routes[req.url].middleware !== undefined &&
            routes[req.url].middleware.length) {

            routes[req.url].middleware.forEach((routeMiddleware) => {

                const middleware = namespace.get('middleware', routeMiddleware)

                try {

                    middleware.handle()

                } catch (exception) {

                    throw new Error(exception)

                }
            })

        }
    }
}

module.exports = new Router()
