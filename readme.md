# Readme

## Description

This repo contains the code for the both the frontend and backend of the application.
The api is hosted on [railway](https://railway.app) and the frontend is hosted on [Vercel](https://vercel.com).

The backend is written in [Node](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/) and [NestJS](https://nestjs.com/) as the framework. The database
is [Postgresql](https://www.postgresql.org/) You can find the code for the backend on the api folder.

The frontend is written in [React](https://reactjs.org/) with [NextJS](https://nextjs.org/) as the framework and [Tailwindcss](https://tailwindcss.com) as the styling solution. You can find the code for the frontend on the app folder.

## Backend

### Installation

This project uses pnpm as the package manager. To install pnpm run the following command:

```bash
npm install -g pnpm
```

To install the backend first go to the api folder.

```bash
cd api
```

And run the following command:

```bash
pnpm install
```

The api folder contains an example for the environment variable file. One is the postgres database and the other jwt secret. Please place an environment variable file in the api folder with the proper values.

### Usage

After installing the backend, you need to migrate the database and generate prisma.
To migrate the database locally run the following command in **api** folder:

```bash
pnpm  migrate:dev
```

To generate prisma locally run the following command in **api** folder:

```bash
pnpm  generate
```

Optionally you can use the prisma studio to view the edit the database manually
just run the following commmand in **api** folder:

```bash
pnpm studio
```

After that you can start the server by running the following command in **api** folder:

```bash
pnpm start:dev
```

 You can interact with the deployed server  [**HERE**](https://movie-list-production.up.railway.app)

The swagger documentation for the backend is available in the [**HERE**](https://movie-list-production.up.railway.app/api)

## Frontend

### Installation

To install the frontend run the following command in **app** directory

```bash
pnpm install
```

Before you start the server you need to have an .env.local file placed in the root of **app** folder an example is provided. Please make sure the password is at least 32 characters

### Usage

To start the server run the following command in **app** folder

```bash
pnpm dev
```

Also please make sure the API_URL is set to the correct url for the backend in the .env.development folder

 You can interact with the deployed app  [**HERE**](http://movie-list-phi.vercel.app)

Email: admin@email.com
Password: 987654321