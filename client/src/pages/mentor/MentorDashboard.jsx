import { Link } from "react-router-dom";

export default function MentorDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Mentor Dashboard</h2>

      <Link to="/mentor/pending">📌 Pending Queue</Link>
      <br /><br />
      <Link to="/mentor/my">✅ My Tickets</Link>
    </div>
  );
}
