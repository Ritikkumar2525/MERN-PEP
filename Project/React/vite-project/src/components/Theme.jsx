import React, { useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("white");

  const toggleTheme = () => {
    setTheme(theme === "white" ? "red" : "white");
  };

  return (
    <div style={{
        backgroundColor: theme,
        height: "100vh",
        textAlign: "center",
        paddingTop: "100px",
        
    }}>
      <h1 style={{ color: theme === "white" ? "red" : "yellow" }}>
        {theme === "white" ? "Light Mode 🌞" : "Dark Mode 🌙"}
      </h1>

      <button
        onClick={toggleTheme}
        style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "10px",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Theme;