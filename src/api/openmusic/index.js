const AlbumHandler = require('./album/AlbumHandler');
const SongHandler = require('./song/SongHandler');
const albumRoutes = require('./album/routes');
const songRoutes = require('./song/routes');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, {
    service: { albumService, songService },
    validator: { albumValidator, songValidator },
  }) => {
    const albumHandler = new AlbumHandler({ albumService, songService }, albumValidator);
    const songHandler = new SongHandler(songService, songValidator);
    server.route([...albumRoutes(albumHandler), ...songRoutes(songHandler)]);
  },
};
