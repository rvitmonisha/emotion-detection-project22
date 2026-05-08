import { useState } from "react";

export default function LoginPage({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    onLogin(user);
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2>Welcome Back 👋</h2>

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

        <button onClick={handleLogin} style={button}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <span style={link} onClick={switchToSignup}>
            Sign Up
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