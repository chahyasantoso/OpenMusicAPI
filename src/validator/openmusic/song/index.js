const InvariantError = require('../../../exceptions/InvariantError');
const { songPayloadSchema, songQuerySchema } = require('./schema');

const songValidator = {
  validateSongPayload: (payload) => {
    const { error } = songPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateSongQuery: (query) => {
    const { error } = songQuerySchema.validate(query);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = songValidator;
