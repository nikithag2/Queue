import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <Link to="/admin/analytics">📊 Analytics</Link>
    </div>
  );
}
