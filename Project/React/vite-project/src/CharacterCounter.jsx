import React, { useState } from 'react'

const CharacterCounter = () => {
    const [text, setText] = useState("");
  return (
    <div>
        <textarea rows="5" cols="40" value={text} onChange={(e)=> setText(e.target.value)}></textarea>
      <h3>Characters: {text.length}</h3>
    </div>
  )
}

export default CharacterCounter
