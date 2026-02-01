// import { useContext, useState } from "react";
// import API from "../../services/api";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const nav = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       login(res.data);

//       alert("✅ Login success");

//       if (res.data.user.role === "student") nav("/student");
//       if (res.data.user.role === "mentor") nav("/mentor");
//       if (res.data.user.role === "admin") nav("/admin");
//     } catch (err) {
//       alert(err?.response?.data?.message || "Login error");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login</h2>

//       <form onSubmit={submit}>
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <br /><br />

//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <br /><br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }



import { useContext, useState } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Save token + user in context/localStorage
      login(res.data);

      alert("✅ Login successful");

      // ✅ Redirect based on role
      const role = res.data?.user?.role;

      if (role === "student") nav("/student");
      else if (role === "mentor") nav("/mentor");
      else if (role === "admin") nav("/admin");
      else nav("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "❌ Login failed. Please try again."
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <br />

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
