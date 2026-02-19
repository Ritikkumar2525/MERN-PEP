import React, { useState } from "react";

function MoodSwitcher() {
  const [mood, setMood] = useState("Kaise Ho");

  return (
    <div style={{
        textAlign: "center",
        marginTop: "100px"
    }}>
      <h1 style={{ fontSize: "100px" }}>{mood}</h1>

      <button onClick={() => setMood("☺️")}>Happy</button>
      <button onClick={() => setMood("😞")}>Sad</button>
      <button onClick={() => setMood("🤬")}>Angry</button>
    </div>
  );
}

export default MoodSwitcher;