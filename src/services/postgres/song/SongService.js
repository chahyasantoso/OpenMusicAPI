const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../../exceptions/InvariantError');
const NotFoundError = require('../../../exceptions/NotFoundError');
const { mapDBToSongModel } = require('../../../utils');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Insert song gagal');
    }

    return result.rows[0].id;
  }

  async getSongs(filter) {
    const query = {
      text: 'SELECT * FROM song',
      values: [],
    };

    const validFilter = filter;
    Object.keys(validFilter).forEach((key) => (typeof validFilter[key] === 'undefined') && delete validFilter[key]);

    const column = Object.keys(validFilter).map((key, index) => `${key} ILIKE $${index + 1}`);
    if (column.length > 0) {
      query.text += ` WHERE ${column.join(' AND ')}`;
      query.values = Object.values(validFilter).map((item) => `%${item}%`);
    }

    const result = await this._pool.query(query);
    return result.rows.map(mapDBToSongModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM song WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return mapDBToSongModel(result.rows[0]);
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE song SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Edit song gagal. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM song WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Delete song gagal. Id tidak ditemukan');
    }
  }
}

module.exports = SongService;
