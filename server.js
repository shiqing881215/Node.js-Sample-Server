var http = require('http');
var url = require('url');

// Pass the route parameter here to do dependency injection, so we don't need the route dependency here
function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received');
		// Send the response parameter to handler, not block other requests
		route(handle, pathname, response, request);
		
	} 

	http.createServer(onRequest).listen(8888);
	console.log('Server is running on 8888');
}

exports.start = start;