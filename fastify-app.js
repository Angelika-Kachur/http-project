// Require the framework and instantiate it
const fastify = require('fastify')()
fastify.register(require('fastify-formbody'))

let name = '';

const optsGet = {
  handler: function (request, reply) {
    let jsonGet = { message: 'Hello World!'}
    if(name != '') {
      jsonGet['message'] = 'Hello ' + name;
      reply.send(JSON.stringify(jsonGet));
    } else {
      reply.send(JSON.stringify(jsonGet));
    }
  }
}

const optsPost = {
  handler: function (request, reply) {
    if(request.body.name != '') {
      name = request.body.name;
    }
    reply.send({ message: 'Hello World!' });
  }
}

fastify.get('/api/hello', optsGet);

fastify.head('/api/hello', optsGet);

fastify.post('/api/hello', optsPost);

fastify.put('/api/hello', optsPost);

fastify.delete('/api/hello', (request, reply) => {
  name = '';
    reply
    .code(204)
    .send({ why: 'doesnt work' })
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