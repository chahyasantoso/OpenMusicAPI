const autoBind = require('auto-bind');

class OpenMusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    // autobind semua method
    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id: albumId } = request.params;
    const album = await this._service.getAlbumById(albumId);
    // ambil songs, filter berdasarkan album id
    const songs = await this._service.getSongs({ album_id: albumId });
    album.songs = songs.map(({ id, title, performer }) => ({ id, title, performer }));

    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });
    return response;
  }

  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { id: albumId } = request.params;
    await this._service.editAlbumById(albumId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Edit album berhasil',
    });
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id: albumId } = request.params;
    await this._service.deleteAlbumById(albumId);

    const response = h.response({
      status: 'success',
      message: 'Delete album berhasil',
    });
    return response;
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const songId = await this._service.addSong(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    this._validator.validateSongQuery(request.query);

    // ambil semua songs, filter songs berdasarkan title dan performer
    const { title: titleFilter, performer: performerFilter } = request.query;
    const songs = await this._service.getSongs({ title: titleFilter, performer: performerFilter });

    const response = h.response({
      status: 'success',
      data: {
        songs: songs.map(({ id, title, performer }) => ({ id, title, performer })),
      },
    });
    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;

    const song = await this._service.getSongById(id);
    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    return response;
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { id } = request.params;
    await this._service.editSongById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Edit song berhasil',
    });
    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);
    const response = h.response({
      status: 'success',
      message: 'Delete song berhasil',
    });
    return response;
  }
}

module.exports = OpenMusicHandler;
