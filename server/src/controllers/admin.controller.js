import Ticket from "../models/Ticket.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();

    const pending = await Ticket.countDocuments({ status: "pending" });
    const claimed = await Ticket.countDocuments({ status: "claimed" });
    const resolved = await Ticket.countDocuments({ status: "resolved" });

    return res.status(200).json({
      totalTickets,
      pending,
      claimed,
      resolved,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
