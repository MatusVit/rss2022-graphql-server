import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { DeleteAnswer } from 'src/modules/common/schemas/common.type';
import { BandFromApi, Band } from '../schemas/bands.type';

export class BandsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getById(id: string): Promise<BandFromApi> {
    return this.get(`${encodeURIComponent(id)}`);
  }

  async getAll(limit: number, offset: number): Promise<BandFromApi> {
    const objectParams = {
      ...(limit && { limit: `${limit}` }),
      ...(offset && { offset: `${offset}` }),
    };
    return this.get('', objectParams);
  }

  async postCreate({ genres: genresIds, ...rest }: Band): Promise<BandFromApi> {
    return this.post('', { genresIds, ...rest });
  }

  async deleteById(id: string): Promise<DeleteAnswer> {
    return this.delete(`${encodeURIComponent(id)}`);
  }

  async putUpdate({
    id,
    name,
    origin,
    members,
    website,
    genres: genresIds,
    ...rest
  }): Promise<BandFromApi> {
    const body = {
      ...(name && { name }),
      ...(origin && { origin }),
      ...(members && { members }),
      ...(website && { website }),
      ...(genresIds && { genresIds }),
      ...rest,
    };
    return this.put(`${encodeURIComponent(id)}`, body);
  }
}
