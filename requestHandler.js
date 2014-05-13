var queryString = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var tmpFile = '/Users/shiqing/Documents/Node/SampleWebsite/tmp.jpg';

function start(response, postData) {
	console.log('Request handler "start" is called');

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
	console.log('Request handler "upload" is called');

	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		fs.renameSync(files.upload.path, tmpFile);
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.write('received image : <br/>');
		response.write('<img src="/show"/>');
		response.end();
	});
}

function show(response, postData) {
	console.log('Request handler "show" is called');

	fs.readFile(tmpFile, 'binary', function(error, file) {
		if (error) {
			response.writeHead(500, {'Content-Type' : 'text/plain'});
			response.write(error + '\n');
			response.end();
		} else {
			response.writeHead(200, {'Content-Type' : 'image/jpg'});
			response.write(file, 'binary');
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
















