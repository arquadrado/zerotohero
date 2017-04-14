'use strict'

const namespace = global.namespace

console.log(global.appRoot)

const routes = {
    '/': {
        'name': 'home',
        'controller': 'HomeController',
        'method': 'home',
        'middleware': ['TestMiddleware']
    },
    '/test': {
        'name': 'test',
        'controller': 'TestController',
        'method': 'test',
        'middleware': []
    },
    '/another-route': {
        'name': 'test',
        'controller': 'HomeController',
        'method': 'hey',
        'middleware': []
    },

    '/assets/bundle': {
        'name': 'test',
        'controller': 'AssetsController',
        'method': 'scripts',
        'middleware': []
    }
}

const Router = function () {
    this.handle = (req, res) => {
        if (routes.hasOwnProperty(req.url)) {


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

            const controller = namespace.get('controllers', routes[req.url]['controller'])

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