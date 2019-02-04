# HTTP Project

GET
'api/hello' --> {'message': 'Hello World'}

POST
'api/hello' {'name': 'Lika'} --> {'message': 'Hello Lika'}

PUT
'api/hello' {'name': 'Lika'} --> {'message': 'Hello Lika'}

GET
'api/hello' --> {'message': 'Hello Lika'}
(if we have variable name in body POST request or not (Lika / World))

DELETE
PUT
'api/hello' {'name': 'Lika'} --> 'status code: 200'
and clear variable name

Set HEAD request
It's the same as GET but without body in response 
(We need headers)

'node app.js'