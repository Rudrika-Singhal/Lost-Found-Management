import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("Fill all fields");
    }

    await axios.post("https://expense-manager-4-tv3q.onrender.com/api/auth/register", form);
    alert("Registered Successfully");
    window.location.href = "/login";
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Create Account</h2>

        <input
          placeholder="Name"
          style={input}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          style={input}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={submit} style={btn}>Register</button>

        <p>
          Already have an account?{" "}
          <span style={link} onClick={() => window.location.href = "/login"}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// Styles
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f7fa"
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#1890ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const link = {
  color: "#1890ff",
  cursor: "pointer"
};