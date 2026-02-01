import { useEffect, useState } from "react";
import API from "../../services/api";
import { socket } from "../../socket/socket";

export default function MentorMyTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchMy = async () => {
    const res = await API.get("/tickets/my");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchMy();

    socket.on("ticket_claimed", fetchMy);
    socket.on("ticket_resolved", fetchMy);

    return () => {
      socket.off("ticket_claimed", fetchMy);
      socket.off("ticket_resolved", fetchMy);
    };
  }, []);

  const resolve = async (id) => {
    try {
      await API.patch(`/tickets/resolve/${id}`);
      alert("✅ Resolved!");
    } catch (err) {
      alert(err?.response?.data?.message || "Resolve error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mentor - My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets yet</p>
      ) : (
        tickets.map((t) => (
          <div key={t._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <h4>{t.title}</h4>
            <p>Status: {t.status}</p>
            {t.status !== "resolved" && (
              <button onClick={() => resolve(t._id)}>Resolve</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
