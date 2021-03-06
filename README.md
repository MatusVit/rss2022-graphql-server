# Graphql Service

GraphQL server implementation for Musicify service

## Installation

1. Download or clone this repository:
   ```bash
   git@github.com:rolling-scopes-school/node-graphql-service.git
   # or
   https://github.com/rolling-scopes-school/node-graphql-service.git
   ```
2. In each microservice copy and rename env.example to .env
   ```bash
   for subdir in */; do mv $subdir.env.example $subdir.env; done;
   ```
3. Install node modules by:

   ```bash
   # separately in each service folder
   npm i

   # separately for each service form the rood directory
   npm run install:%serviceName%

   # for all services (install dependencies for root folder and it will install nested dependencies in postinstall script)
   npm i
   ```

4. To run services:

   ```bash
   # separately in each service folder
   npm run:start:dev

   # separately for each service form the rood directory
   npm run run:%serviceName%

   # all services watch+debug
   npm run run:all:dev

   # all services watch
   npm run run:all

   # all services prod mode
   npm run run:all:prod
   ```

5. Clone repository
   ```bash
   https://github.com/MatusVit/rss2022-graphql-server.git
   ```
6. Switch to branch task5
7. Run `npm ci` in project folder
8. For start
   - `npm run start` run project
   - `npm run start:dev` run project in development mode
9. `http://localhost:3000/api` (by default) use studio.apollographql for query and mutation
10. Schema

```
type Query {
      album(id: ID!): Album
      albums(limit: Int, offset: Int): [Album]
      artist(id: ID!): Artist
      artists(limit: Int, offset: Int): [Artist]
      band(id: ID!): Band
      bands(limit: Int, offset: Int): [Band]
      favourites: Favourites
      genre(id: ID!): Genre
      genres(limit: Int, offset: Int): [Genre]
      track(id: ID!): Track
      tracks(limit: Int, offset: Int): [Track]
      user(id: ID!): User!
      jwt(email: String!, password: String!): String
}

type Mutation {
      createAlbum(albumInput: CreateAlbumInput): Album
      deleteAlbum(id: ID!): DeleteAnswer
      updateAlbum(albumInput: UpdateAlbumInput): Album
      createArtist(artistInput: ArtistCreateInput): Artist
      deleteArtist(id: ID!): DeleteAnswer
      updateArtist(artistInput: ArtistUpdateInput): Artist
      createBand(bandInput: CreateBandInput): Band
      deleteBand(id: ID!): DeleteAnswer
      updateBand(bandInput: UpdateBandInput): Band
      addTrackToFavourites(id: ID!): Favourites
      addBandToFavourites(id: ID!): Favourites
      addArtistToFavourites(id: ID!): Favourites
      addGenreToFavourites(id: ID!): Favourites
      deleteTrackToFavourites(id: ID!): Favourites
      deleteBandToFavourites(id: ID!): Favourites
      deleteArtistToFavourites(id: ID!): Favourites
      deleteGenreToFavourites(id: ID!): Favourites
      createGenre(genreInput: CreateGenreInput): Genre
      deleteGenre(id: ID!): DeleteAnswer
      updateGenre(genreInput: UpdateGenreInput): Genre
      createTrack(trackInput: CreateTrackInput): Track
      deleteTrack(id: ID!): DeleteAnswer
      updateTrack(trackInput: UpdateTrackInput): Track
      register(userInput: RegisterUserInput): User!
}
```
