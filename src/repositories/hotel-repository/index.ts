import { prisma } from "@/config";

async function findAllHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findAllHotels,
};

export default hotelRepository;
