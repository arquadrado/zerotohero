
module.exports = {
    '/': {
        'name': 'home',
        'controller': 'HomeController',
        'method': 'home',
        'middleware': ['TestMiddleware']
    },

    '/login': {
        'name': 'login',
        'controller': 'AuthController',
        'method': 'login',
        'middleware': []
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

    //asset routes

    '/build/bundle': {
        'name': 'test',
        'controller': 'AssetsController',
        'method': 'getResource',
        'middleware': []
    },

    '/build/main.css': {
        'name': 'styles',
        'controller': 'AssetsController',
        'method': 'getResource',
        'middleware': []
    }
}


