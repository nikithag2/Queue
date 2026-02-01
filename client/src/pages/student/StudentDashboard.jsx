import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Student Dashboard</h2>
      <p>Welcome Student ✅</p>

      <Link to="/student/create">➕ Create Ticket</Link>
    </div>
  );
}
