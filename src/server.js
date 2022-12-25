require('dotenv').config();

const Hapi = require('@hapi/hapi');

const album = require('./api/album');
const AlbumService = require('./services/postgres/AlbumService');
const albumValidator = require('./validator/album');

const song = require('./api/song');
const SongService = require('./services/postgres/SongService');
const songValidator = require('./validator/song');

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

  const albumService = new AlbumService();
  const songService = new SongService();
  await server.register([
    {
      plugin: album,
      options: {
        service: { albumService, songService },
        validator: albumValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songService,
        validator: songValidator,
      },
    },
  ]);

  // onPreResponse error handling
  server.ext('onPreResponse', (request, h) => {
    const { response } = request; // mendapatkan konteks response dari request

    // intercept hanya jika response adalah client error dan server error
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
        console.error(response); // log to console buat developer

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
