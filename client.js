const request = require('request');
const http = require('http');
const { readKeepAliveTimeout } = require("./utils");

const keepAliveTimeout = readKeepAliveTimeout();

let agent = new http.Agent({
    keepAlive: true,
});

let baseUrl = 'http://localhost:9666';

function getStatus() {
    request.get(baseUrl + '/status', {
        agent: agent
    }, (err, resp) => {
        if (err) {
            throw err;
        }
        console.log('Got get response', resp.statusCode, resp.body);
    });
}


function run() {
	request(baseUrl + '/longpost', {
		method: 'OPTIONS',
		agent: agent
	}, (err, resp) => {
		if (err) {
			throw err;
		}
		console.log('Got options response', resp.statusCode);
		console.log('Sending post request');
		request.post(baseUrl + '/longpost', {
				agent: agent,
				json: true,
				body: {id: 1},
				headers: [
					{ name: 'Connection', value: 'keep-alive' }
				]
			}, (err, resp) => {
			if (err) {
				throw err;
			}
			console.log('Got post response', resp.statusCode, resp.body);
		});
	});
}

setInterval(run, keepAliveTimeout);
