import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/admin/analytics")
      .then((res) => setData(res.data))
      .catch((err) => alert(err?.response?.data?.message || "Analytics error"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Analytics</h2>

      {!data ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Total Tickets: {data.totalTickets}</p>
          <p>Pending: {data.pending}</p>
          <p>Claimed: {data.claimed}</p>
          <p>Resolved: {data.resolved}</p>
        </div>
      )}
    </div>
  );
}
