const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { service: { albumService, songService }, validator }) => {
    const handler = new AlbumHandler({ albumService, songService }, validator);
    server.route(routes(handler));
  },
};
