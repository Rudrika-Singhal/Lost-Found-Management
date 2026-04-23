import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const API = "https://lost-found-management-5.onrender.com";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/auth/register`, form);
      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      alert("User already exists ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Name"
            value={form.name}
            onChange={e => setForm({...form, name:e.target.value})}
          />

          <input placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
          />

          <input type="password" placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
          />

          <button>Register</button>
        </form>

        <Link to="/">Already have account?</Link>
      </div>
    </div>
  );
}