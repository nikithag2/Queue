import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered! Now login.");
      nav("/login");
    } catch (err) {
  alert(err?.response?.data?.message || err.message || "Register error");
  console.log(err);
}

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <br /><br />

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <br /><br />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
