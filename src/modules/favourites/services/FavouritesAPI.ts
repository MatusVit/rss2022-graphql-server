import { TrackFromApi } from '../../tracks/schemas/tracks.type';
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { FavoriteFromApi, FavoriteType } from '../schemas/favourites.type';

export class FavouritesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAll(): Promise<FavoriteFromApi> {
    return await this.get('');
  }

  async putAddFavorite({ type, id }: { type: FavoriteType; id: string }): Promise<FavoriteFromApi> {
    return this.put('add', { type, id });
  }

  async putRemoveFavorite({
    type,
    id,
  }: {
    type: FavoriteType;
    id: string;
  }): Promise<FavoriteFromApi> {
    return this.put('remove', { type, id });
  }
}
