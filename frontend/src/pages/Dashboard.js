import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    contactInfo: ""
  });

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    const res = await axios.get(`${API}/api/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    if (!form.itemName) return alert("Item name required");

    if (editId) {
      await axios.put(`${API}/api/items/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditId(null);
    } else {
      await axios.post(`${API}/api/items`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setForm({
      itemName: "",
      description: "",
      type: "Lost",
      location: "",
      contactInfo: ""
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/api/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchItems();
  };

  const editItem = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const filteredItems = items.filter(i =>
    i.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="container">

      <div className="header">
        <h2>Lost & Found</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="card">
        <h3>{editId ? "Update Item" : "Add Item"}</h3>

        <input placeholder="Item Name"
          value={form.itemName}
          onChange={e => setForm({...form, itemName:e.target.value})}
        />

        <input placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description:e.target.value})}
        />

        <select value={form.type}
          onChange={e => setForm({...form, type:e.target.value})}>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input placeholder="Location"
          value={form.location}
          onChange={e => setForm({...form, location:e.target.value})}
        />

        <input placeholder="Contact Info"
          value={form.contactInfo}
          onChange={e => setForm({...form, contactInfo:e.target.value})}
        />

        <button className="add-btn" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <input
        placeholder="Search items..."
        onChange={e => setSearch(e.target.value)}
      />

      {filteredItems.map(item => (
        <div key={item._id} className="card">
          <h3>{item.itemName}</h3>
          <p>{item.description}</p>
          <p><b>{item.type}</b></p>
          <p>{item.location}</p>

          <button className="update-btn" onClick={() => editItem(item)}>Edit</button>
          <button className="delete-btn" onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}