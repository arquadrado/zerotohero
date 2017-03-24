'use strict'

const namespace = global.namespace

const routes = {
    '/': {
        'name': 'home',
        'controller': 'HomeController',
        'method': 'home',
        'middleware': ['TestMiddleware', 'AnotherMiddleware']
    },
    '/test': {
        'name': 'test',
        'controller': 'TestController',
        'method': 'test',
        'middleware': []
    }
}

const Router = function () {
    this.handle = (req, res) => {
        if (routes.hasOwnProperty(req.url)) {

            if (routes[req.url].middleware !== undefined &&
                routes[req.url].middleware.length) {

                routes[req.url].middleware.forEach((routeMiddleware) => {
                    const middleware = require(`../middleware/${routeMiddleware}.js`)
                    middleware.handle()
                })

            }

            const controller = require('../controllers/' + routes[req.url]['controller'])

            const method = routes[req.url]['method']

            if (controller.hasOwnProperty(method)) {

                const data = controller[method]()
                res.statusCode = data.status
                res.setHeader('Content-Type', data.contentType)
                res.end(data.content)

                return 0
            }

            throw new Error('Invalid request')
        }
    }
}

module.exports = new Router()