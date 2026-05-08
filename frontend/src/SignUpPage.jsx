import { useState } from "react";

export default function SignUpPage({ onSignup, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");

  function handleSignup() {
    if (!name || !email || !password || !category) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("User already exists. Please login.");
      return;
    }

    const newUser = { name, email, password, category };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    onSignup(newUser);
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2>Create Account 🌸</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {/* CATEGORY FIELD */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          <option value="">Select Category</option>
          <option value="working">Working</option>
          <option value="housewife">Housewife</option>
          <option value="pregnant">Pregnant</option>
        </select>

        <button onClick={handleSignup} style={button}>
          Sign Up
        </button>

        <p>
          Already have an account?{" "}
          <span style={link} onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* STYLES */
const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 360,
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: 12,
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const button = {
  width: "100%",
  marginTop: 16,
  padding: "10px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const link = {
  color: "#6366f1",
  cursor: "pointer",
};