const path = require('path');

global.appRoot = path.resolve(__dirname);
global.namespace = require('./bootstrap/FileStructure.js')

const http = require('http')
const router = require('./routes/web.js')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {

    try {
        router.handle(req, res)
    } catch (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.end(`<h3>Error: ${err.message}</h3><h2>Line: ${err.stack}</h2><h1>File: ${err.name}</h1>`)
    }

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})