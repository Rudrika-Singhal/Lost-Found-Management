import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const API = "https://lost-found-management-5.onrender.com";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
          />

          <input type="password" placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
          />

          <button>Login</button>
        </form>

        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
}