const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

export function createUsers(num: number) {
  const users = Array.from({ length: num }, () =>
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
      },
    })
  );
  return users;
}
