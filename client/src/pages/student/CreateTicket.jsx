import { useState } from "react";
import API from "../../services/api";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tickets/create", { title, description, category });
      alert("✅ Ticket Created!");
      setTitle("");
      setDescription("");
      setCategory("General");
    } catch (err) {
      alert(err?.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Ticket</h2>

      <form onSubmit={submit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br /><br />

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br /><br />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>React</option>
          <option>Node</option>
          <option>MongoDB</option>
          <option>Bug</option>
        </select>

        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
