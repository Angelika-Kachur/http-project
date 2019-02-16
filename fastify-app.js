// Require the framework and instantiate it
const fastify = require('fastify')()
fastify.register(require('fastify-formbody'))

let name = 'World!';
let makeJson = name => {return { message: 'Hello ' + name}};

const optsGet = {
  handler: function (request, resp) {
      console.log(JSON.stringify(makeJson(name)));
      resp.send(JSON.stringify(makeJson(name)));
  }
}

const optsPost = {
  handler: function (request, resp) {
    if(request.body.name != '') {
      name = request.body.name;
    }
    resp.send(JSON.stringify(makeJson(name)));
  }
}

fastify.get('/api/hello', optsGet);

fastify.head('/api/hello', optsGet);

fastify.post('/api/hello', optsPost);

fastify.put('/api/hello', optsPost);

fastify.delete('/api/hello', (request, resp) => {
  name = 'World!';
    resp
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