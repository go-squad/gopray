import { PrismaClient } from '@prisma/client';

let database: PrismaClient;

declare global {
  var __database: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient();
} else {
  if (!global.__database) {
    global.__database = new PrismaClient();
  }
  database = global.__database;
}

export { database };
