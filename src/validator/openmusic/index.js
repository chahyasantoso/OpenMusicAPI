const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayloadSchema, SongPayloadSchema, SongQuerySchema } = require('./schema');

const OpenMusicValidator = {
  validateAlbumPayload: (payload) => {
    const { error } = AlbumPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateSongPayload: (payload) => {
    const { error } = SongPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateSongQuery: (query) => {
    const { error } = SongQuerySchema.validate(query);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = OpenMusicValidator;
