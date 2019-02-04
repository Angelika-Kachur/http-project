const http = require('http');
const port = 3000;
const { parse } = require('querystring');
var name = '';
var s = http.createServer();
s.on('request', function(request, response) {

  function handlleRequest() {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
      let objBody = JSON.parse(body);
      name = objBody['name'];
      let jsonResp = {'message': 'Hello '};
      jsonResp['message'] = 'Hello ' + name;
      response.write(JSON.stringify(jsonResp));
      response.end();
    });
  }

  if(request.url === '/') {
    response.write('This is slash');
    response.end();
  }

  if(request.url === '/api/hello' && request.method === 'GET') {
    let jsonGet = {'message': 'Hello World!'}
    if(name != '') {
      jsonGet['message'] = 'Hello ' + name;
      response.write(JSON.stringify(jsonGet));
      response.end();
    } else {
      response.write(JSON.stringify(jsonGet));
      response.end();
    }
  }

  if(request.url === '/api/hello' && request.method === 'HEAD') {
    response.write();
    response.end();
  }
  
  if (request.url === '/api/hello' && request.method === 'POST') {
    handlleRequest();
  }

  if (request.url === '/api/hello' && request.method === 'PUT') {
    handlleRequest();
  }

  if (request.url === '/api/hello' && request.method === 'DELETE') {
    name = '';
    response.write('Status code: ' + response.statusCode);
    response.end();
  }
});
 
s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);