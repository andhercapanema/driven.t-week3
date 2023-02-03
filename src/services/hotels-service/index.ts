import { notFoundError, paymentRequiredError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function checkIfUserHasAPaidTicketIncludingHotel(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError("Enrollment");

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError("Ticket");

  const { TicketType } = ticket;

  if (TicketType.isRemote === true || TicketType.includesHotel === false || ticket.status !== "PAID")
    throw paymentRequiredError();
}

async function getAllHotels(userId: number) {
  checkIfUserHasAPaidTicketIncludingHotel(userId);

  const hotels = await hotelRepository.findAllHotels();

  if (hotels.length === 0) throw notFoundError("Hotel");

  return hotels;
}

const hotelService = {
  getAllHotels,
};

export default hotelService;
