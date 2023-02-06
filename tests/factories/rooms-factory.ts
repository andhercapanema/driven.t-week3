import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createRoom({ hotelId }: { hotelId: number }) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
  /* return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  }); */
}
