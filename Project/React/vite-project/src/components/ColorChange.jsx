import React, { useState } from 'react'

function ColorChange() {
    const [color, setColor] = useState("white");

  return (
    <div style={{ backgroundColor: color, height: "100vh", textAlign: "center", paddingTop: "50px" }}>
      <h1>Change Background Color</h1>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("green")}>Green</button>
    </div>
  )
}

export default ColorChange;
