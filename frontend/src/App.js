import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("login"); // login / signup
  const [user, setUser] = useState(null);

  // 🔹 When login/signup success
  const handleAuth = (userData) => {
    setUser(userData);
  };

  // 🔹 Logout
  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  // 🔹 If user logged in → Dashboard
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // 🔹 Otherwise show Login or Signup
  return page === "login" ? (
    <LoginPage
      onLogin={handleAuth}
      switchToSignup={() => setPage("signup")}
    />
  ) : (
    <SignUpPage
      onSignup={handleAuth}
      switchToLogin={() => setPage("login")}
    />
  );
}

export default App;