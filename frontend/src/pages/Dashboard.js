import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
    else fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setExpenses(res.data);
  };

  const addExpense = async () => {
    if (!form.title || !form.amount || !form.category) {
      return alert("Fill all fields");
    }

    await axios.post("https://expense-manager-4-tv3q.onrender.com/api/expense", form, {
      headers: { Authorization: localStorage.getItem("token") }
    });

    setForm({});
    fetchExpenses();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div style={{
      background: "#f5f7fa",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Segoe UI"
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2>💰 Expense Dashboard</h2>
        <button onClick={logout} style={{
          padding: "8px 15px",
          background: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Logout
        </button>
      </div>

      {/* Add Expense Card */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <h3>Add Expense</h3>
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Amount"
          value={form.amount || ""}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Category"
          value={form.category || ""}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={inputStyle}
        />
        <button onClick={addExpense} style={btnStyle}>Add Expense</button>
      </div>

      {/* Total + Filter */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px"
      }}>
        <h3>Total: ₹{total}</h3>

        <input
          placeholder="Filter by category"
          onChange={e => setFilter(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Expense List */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "15px"
      }}>
        {expenses
          .filter(e =>
            e.category?.toLowerCase().includes(filter.toLowerCase())
          )
          .map(e => (
            <div key={e._id} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h4>{e.title}</h4>
              <p>₹{e.amount}</p>
              <small>{e.category}</small>
            </div>
          ))}
      </div>
    </div>
  );
}

// 🔹 Styles
const inputStyle = {
  display: "block",
  margin: "10px 0",
  padding: "8px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc"
};


const btnStyle = {
  padding: "10px 15px",
  background: "#1890ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
