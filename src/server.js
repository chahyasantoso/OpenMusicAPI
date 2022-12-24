require('dotenv').config();

const Hapi = require('@hapi/hapi');
const openMusic = require('./api/openmusic');
const OpenmusicService = require('./services/postgres/OpenmusicService');
const OpenMusicValidator = require('./validator/openmusic');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const openMusicService = new OpenmusicService();
  await server.register({
    plugin: openMusic,
    options: {
      service: openMusicService,
      validator: OpenMusicValidator,
    },
  });

  // onPreResponse error handling
  server.ext('onPreResponse', (request, h) => {
    const { response } = request; // mendapatkan konteks response dari request

    // intercept error hanya jika dia client error dan server error
    if (response instanceof Error) {
      // client error
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // server error, code >= 500
      if (response.isServer) {
        const newResponse = h.response({
          status: 'error',
          message: 'server error',
        });
        newResponse.code(500);
        return newResponse;
      }
    }

    // selain diatas, lanjutkan response sebelumnya;
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
