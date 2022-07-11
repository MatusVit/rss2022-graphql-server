import { TrackFromApi } from './../schemas/tracks.type';
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { DeleteAnswer } from 'src/modules/common/schemas/common.type';

export class TracksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.TRACKS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getById(id: string): Promise<TrackFromApi> {
    return this.get(`${encodeURIComponent(id)}`);
  }

  async getAll(limit: number, offset: number): Promise<TrackFromApi> {
    const objectParams = {
      ...(limit && { limit: `${limit}` }),
      ...(offset && { offset: `${offset}` }),
    };
    return this.get('', objectParams);
  }

  async postCreate({
    album: albumId,
    artists: artistsIds,
    bands: bandsIds,
    genres: genresIds,
    ...rest
  }): Promise<TrackFromApi> {
    return this.post('', { albumId, artistsIds, bandsIds, genresIds, ...rest });
  }

  async deleteById(id: string): Promise<DeleteAnswer> {
    return this.delete(`${encodeURIComponent(id)}`);
  }

  async putUpdate({
    id,
    album: albumId,
    artists: artistsIds,
    bands: bandsIds,
    genres: genresIds,
    ...rest
  }): Promise<TrackFromApi> {
    const body = {
      ...(albumId && { albumId }),
      ...(artistsIds && { artistsIds }),
      ...(bandsIds && { bandsIds }),
      ...(genresIds && { genresIds }),
      ...rest,
    };
    return this.put(`${encodeURIComponent(id)}`, body);
  }
}
