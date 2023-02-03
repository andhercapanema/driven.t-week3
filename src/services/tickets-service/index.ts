import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError("Ticket Types");
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError("Enrollment");
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError("Ticket");
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError("Enrollment");
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
};

export default ticketService;
