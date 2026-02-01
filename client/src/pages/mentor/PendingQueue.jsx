import { useEffect, useState } from "react";
import API from "../../services/api";
import { socket } from "../../socket/socket";

export default function PendingQueue() {
  const [tickets, setTickets] = useState([]);

  const fetchPending = async () => {
    const res = await API.get("/tickets/pending");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchPending();

    socket.on("new_ticket", fetchPending);
    socket.on("ticket_claimed", fetchPending);
    socket.on("ticket_resolved", fetchPending);

    return () => {
      socket.off("new_ticket", fetchPending);
      socket.off("ticket_claimed", fetchPending);
      socket.off("ticket_resolved", fetchPending);
    };
  }, []);

  const claim = async (id) => {
    try {
      await API.patch(`/tickets/claim/${id}`);
      alert("✅ Ticket Claimed!");
    } catch (err) {
      alert(err?.response?.data?.message || "Claim error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mentor - Pending Queue</h2>

      {tickets.length === 0 ? (
        <p>No Pending Tickets ✅</p>
      ) : (
        tickets.map((t) => (
          <div key={t._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <h4>{t.title}</h4>
            <p>{t.description}</p>
            <small>Category: {t.category}</small>
            <br /><br />
            <button onClick={() => claim(t._id)}>Claim</button>
          </div>
        ))
      )}
    </div>
  );
}
