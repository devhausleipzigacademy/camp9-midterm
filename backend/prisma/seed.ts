import { createUsers } from './seed/createUser';
import { fetchNowPlayingMovies } from './seed/fetchMovies';

const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function createMockData() {
  // Generate mock data for User model
  const userPromises = createUsers(10);

  fetchNowPlayingMovies();

  await Promise.all([...userPromises]);
}

createMockData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
