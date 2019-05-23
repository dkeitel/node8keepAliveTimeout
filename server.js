const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { readKeepAliveTimeout } = require("./utils");

const keepAliveTimeout = readKeepAliveTimeout();
let connections = 0;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('got request', req.method, req.path);
    if (req.header('Origin')) {
        res.header('Access-Control-Allow-Origin', req.header('Origin'));
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ForcePreflight');
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
});

let router = express.Router();

let prev;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.post('/longpost', (req, resp) => {
    ++connections;
    let now = new Date().getTime();
    if (prev) {
        let dt = now - prev;
        console.log(`format called ${dt}ms after previous. Open connections: ${connections}`);
    }
    prev = now;
    setTimeout(() => {
        resp.send(JSON.stringify({ status: 'OK' }));
        --connections;
    }, keepAliveTimeout * 3 - getRandomInt(20))
});

app.use('/', router);

let server = http.createServer(app);
// workaround: set the keepAliveTimeout property
server.keepAliveTimeout = keepAliveTimeout;
console.log('set keepAliveTimeout to', server.keepAliveTimeout);

server.listen(9666);
