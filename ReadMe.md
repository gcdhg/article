# Article app

simple app that's written\
on: Node.js\
with: TypeScript, TypeGraphQL, sequelize-typescript, apollo-server-express, express

## Connection to database

in file `dbconfig.ts` you need to place ur database connection data

```typescript
database: "gcdhg",
dialect: "mysql",
username: "gcdhg",
password: "12345",
```

## Run locally on your machine

You need to have installed Node and NPM.

Clone this repository

```bash
git clone https://github.com/gcdhg/article.git
```

Install dependencies

```bash
npm install
```

Start NodeJS server at http://localhost:4000 (port 4000 is default)

```bash
npm start
```

in `.env` file we have on;y one option:

```dosini
PORT=4000
```

PORT - server port

to run tests:

```dosing
npm test
```
