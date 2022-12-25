const Joi = require('joi');

const songPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

const songQuerySchema = Joi.object({
  title: Joi.string(),
  performer: Joi.string(),
});

module.exports = { songPayloadSchema, songQuerySchema };
