import { prisma } from "@/config";

async function findAllHotels() {
  return prisma.hotel.findMany();
}

async function findHotelByIdWithRooms(id: number) {
  return prisma.hotel.findUnique({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findAllHotels,
  findHotelByIdWithRooms,
};

export default hotelRepository;
