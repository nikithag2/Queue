import { getIO } from "../../../client/src/socket/io.js";
import Ticket from "../models/Ticket.model.js";
import { SOCKET_EVENTS } from "../socket/socketEvents.js";



export const createTicket = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      createdBy: req.user._id,
    });

    getIO().emit(SOCKET_EVENTS.NEW_TICKET, ticket);

    return res.status(201).json({ message: "Ticket created ✅", ticket });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPendingTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: "pending" }).sort({ createdAt: 1 });
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ claimedBy: req.user._id }).sort({ updatedAt: -1 });
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const claimTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.status !== "pending") {
      return res.status(400).json({ message: "Ticket already claimed/resolved" });
    }

    ticket.status = "claimed";
    ticket.claimedBy = req.user._id;
    ticket.claimedAt = new Date();
    await ticket.save();

    getIO().emit(SOCKET_EVENTS.TICKET_CLAIMED, ticket);

    return res.status(200).json({ message: "Ticket claimed ✅", ticket });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resolveTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.status === "resolved") {
      return res.status(400).json({ message: "Already resolved" });
    }

    ticket.status = "resolved";
    ticket.resolvedAt = new Date();
    await ticket.save();

    getIO().emit(SOCKET_EVENTS.TICKET_RESOLVED, ticket);

    return res.status(200).json({ message: "Ticket resolved ✅", ticket });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
