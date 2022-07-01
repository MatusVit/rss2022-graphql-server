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
