const InvariantError = require('../../exceptions/InvariantError');
const { albumPayloadSchema } = require('./schema');

const albumValidator = {
  validateAlbumPayload: (payload) => {
    const { error } = albumPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = albumValidator;
