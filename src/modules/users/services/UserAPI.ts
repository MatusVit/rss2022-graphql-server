import { User, UserFromAPI } from './../schemas/user.type';
import { RESTDataSource } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;
  }

  async getUser(id): Promise<UserFromAPI> {
    return this.get(`${encodeURIComponent(id)}`);
  }

  async postJwt({ email, password }): Promise<String> {
    return this.post(`login`, { email, password });
  }

  async postRegister({ email, password, firstName, lastName }): Promise<UserFromAPI> {
    return this.post(`register`, { email, password, firstName, lastName });
  }
}
