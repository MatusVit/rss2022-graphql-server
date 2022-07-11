import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { DeleteAnswer } from 'src/modules/common/schemas/common.type';
import { GenreFromAPI } from './../schemas/genres.type';

export class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async postCreate(input): Promise<GenreFromAPI> {
    return this.post('', input);
  }

  async getById(id: string): Promise<GenreFromAPI> {
    return this.get(`${encodeURIComponent(id)}`);
  }

  async getAll(limit: number, offset: number): Promise<GenreFromAPI> {
    const objectParams = {
      ...(limit && { limit: `${limit}` }),
      ...(offset && { offset: `${offset}` }),
    };
    return this.get('', objectParams);
  }

  async deleteById(id: string): Promise<DeleteAnswer> {
    return this.delete(`${encodeURIComponent(id)}`);
  }

  async putUpdate({ id, ...rest }): Promise<GenreFromAPI> {
    const body = rest;
    return this.put(id, body);
  }
}
