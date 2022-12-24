/* eslint-disable camelcase */

// di database albumId disimpan sebagai album_id, makanya perlu di mapping balik
const mapDBToSongModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

module.exports = { mapDBToSongModel };
