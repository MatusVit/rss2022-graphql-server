import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { DeleteAnswer } from 'src/modules/common/schemas/common.type';
import { AlbumFromApi } from '../schemas/albums.type';

export class AlbumsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getById(id: string): Promise<AlbumFromApi> {
    return this.get(`${encodeURIComponent(id)}`);
  }

  async getAll(limit: number, offset: number): Promise<AlbumFromApi> {
    const objectParams = {
      ...(limit && { limit: `${limit}` }),
      ...(offset && { offset: `${offset}` }),
    };
    return this.get('', objectParams);
  }

  async postCreate({
    artists: artistsIds,
    bands: bandsIds,
    tracks: trackIds,
    genres: genresIds,
    ...rest
  }): Promise<AlbumFromApi> {
    return this.post('', { artistsIds, bandsIds, trackIds, genresIds, ...rest });
  }

  async deleteById(id: string): Promise<DeleteAnswer> {
    return this.delete(`${encodeURIComponent(id)}`);
  }

  async putUpdate({
    id,
    artists: artistsIds,
    bands: bandsIds,
    tracks: trackIds,
    genres: genresIds,
    ...rest
  }): Promise<AlbumFromApi> {
    const body = {
      ...(artistsIds && { artistsIds }),
      ...(bandsIds && { bandsIds }),
      ...(trackIds && { trackIds }),
      ...(genresIds && { genresIds }),
      ...rest,
    };
    return this.put(`${encodeURIComponent(id)}`, body);
  }
}
