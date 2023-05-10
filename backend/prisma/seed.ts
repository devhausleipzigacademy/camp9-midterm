const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function createMockData() {
  // Generate mock data for User model
  const userPromises = Array.from({ length: 10 }, () =>
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
      },
    })
  );

  // Generate mock data for Seats model
  // const seatPromises = // array of promises for creating seats from rows from A numbers 1 to 6 of price $12.95; B, C, D, E numbers 1 to 8 of price $14.95 and F  numbers 1 to 6 of price $16.95
  //   Array.from({ length: 6 }, (_, i) =>
  //     Array.from({ length: 8 }, (_, j) =>
  //       prisma.seat.create({
  //         data: {
  //           row: String.fromCharCode(65 + i),
  //           number: j + 1,
  //           price: i === 0 ? 12.95 : i === 5 ? 16.95 : 14.95,
  //         },
  //       })
  //     )
  //   );

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
