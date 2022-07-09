import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { DeleteAnswer } from 'src/modules/common/schemas/common.type';
import { ArtistFromAPI } from './../schemas/artists.type';

export class ArtistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getById(id: string): Promise<ArtistFromAPI> {
    return this.get(id);
  }

  async getAll(limit: number, offset: number): Promise<ArtistFromAPI> {
    const objectParams = {
      ...(limit && { limit: `${limit}` }),
      ...(offset && { offset: `${offset}` }),
    };
    return this.get('', objectParams);
  }

  async postCreate({ bands: bandsIds, ...rest }): Promise<ArtistFromAPI> {
    return this.post('', { bandsIds, ...rest });
  }

  async deleteById(id: string): Promise<DeleteAnswer> {
    return this.delete(`${encodeURIComponent(id)}`);
  }

  async putUpdate({ id, bands: bandsIds, ...rest }): Promise<ArtistFromAPI> {
    const body = { ...(bandsIds && { bandsIds }), ...rest };
    return this.put(`${encodeURIComponent(id)}`, body);
  }
}
