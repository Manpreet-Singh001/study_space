import React, { useState } from "react";
import "./menu.css";
import SoundSelector from "./soundSelector";
import Notes from "./notes";

function Menu(props) {
  const [content, setContent] = useState("default");

  const menuSelections = {
    default: (
      <div className="menu-container">
        <button
          className="menu-item"
          onClick={() => {
            setContent("sound-select");
          }}
        >
          sounds
        </button>
        <button
          className="menu-item"
          onClick={() => {
            setContent("notes");
          }}
        >
          notes
        </button>
        <button className="menu-item">topics</button>
        <button className="menu-item">s</button>
        <button className="menu-item">s</button>
      </div>
    ),
    "sound-select": <SoundSelector />,
    notes: <Notes />,
  };

  return (
    <div className="menu">
      <h1>menu</h1>
      {menuSelections[content]}
      {content !== "default" && (
        <button
          onClick={() => {
            setContent("default");
          }}
        >
          go back
        </button>
      )}
    </div>
  );
}

export default Menu;
