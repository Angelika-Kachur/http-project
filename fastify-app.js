// Require the framework and instantiate it
const fastify = require('fastify')()
fastify.register(require('fastify-formbody'))

let name = '';

fastify.route({
  method: 'GET',
  url: '/api/hello',
  handler: function (request, reply) {
    let jsonGet = { message: 'Hello World!'}
    if(name != '') {
      jsonGet['message'] = 'Hello ' + name;
      reply.send(JSON.stringify(jsonGet));
    } else {
      reply.send(JSON.stringify(jsonGet));
    }
  }
});

fastify.route({
  method: 'HEAD',
  url: '/api/hello',
  handler: function (request, reply) {
    reply.send();
  }
});

fastify.route({
  method: 'POST',
  url: '/api/hello',
  handler: function (request, reply) {
    if(request.body.name != '') {
      name = request.body.name;
    }
    reply.send({ message: 'Hello World!' });
  }
});

fastify.route({
  method: 'PUT',
  url: '/api/hello',
  handler: function (request, reply) {
    if(request.body.name != '') {
      name = request.body.name;
    }
    reply.send({ message: 'Hello World!' });
  }
});

fastify.route({
  method: 'DELETE',
  url: '/api/hello',
  handler: function (request, reply) {
    name = '';
    reply
    .code(204)
    .send({ why: 'doesnt work' })
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}
console.log('Working...')
start();