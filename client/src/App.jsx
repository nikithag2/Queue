import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import StudentDashboard from "./pages/student/StudentDashboard";
import CreateTicket from "./pages/student/CreateTicket";

import MentorDashboard from "./pages/mentor/MentorDashboard";
import PendingQueue from "./pages/mentor/PendingQueue";
import MentorMyTickets from "./pages/mentor/MentorMyTickets";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Analytics from "./pages/admin/Analytics";

import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/create"
          element={
            <ProtectedRoute roles={["student"]}>
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        {/* Mentor */}
        <Route
          path="/mentor"
          element={
            <ProtectedRoute roles={["mentor"]}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/pending"
          element={
            <ProtectedRoute roles={["mentor"]}>
              <PendingQueue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/my"
          element={
            <ProtectedRoute roles={["mentor"]}>
              <MentorMyTickets />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
