const autoBind = require('auto-bind');

class AlbumHandler {
  constructor({ albumService, songService }, validator) {
    this._service = { albumService, songService };
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;
    const albumId = await this._service.albumService.addAlbum({ name, year });

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
    const album = await this._service.albumService.getAlbumById(albumId);
    const songs = await this._service.songService.getSongs({ album_id: albumId });
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
    await this._service.albumService.editAlbumById(albumId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Edit album berhasil',
    });
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id: albumId } = request.params;
    await this._service.albumService.deleteAlbumById(albumId);

    const response = h.response({
      status: 'success',
      message: 'Delete album berhasil',
    });
    return response;
  }
}

module.exports = AlbumHandler;
