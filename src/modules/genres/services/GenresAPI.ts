import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParams } from 'url';
import { DeleteAnswer, GenreFromAPI } from './../schemas/genres.type';

export class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async postCreate({ name, description, country, year }): Promise<GenreFromAPI> {
    return this.post('', { name, description, country, year });
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

  async putUpdate(id, name, description, country, year): Promise<GenreFromAPI> {
    const body = {
      ...(name && { name }),
      ...(description && { description }),
      ...(country && { country }),
      ...(year && { year }),
    };

    return this.put(`${encodeURIComponent(id)}`, body);
  }
}
