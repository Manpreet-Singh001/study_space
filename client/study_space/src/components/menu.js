import React, { useState } from "react";
import "./menu.css";
import SoundSelector from "./soundSelector";
import Notes from "./notes";
import Session from "./session";

function Menu(props) {
  const [content, setContent] = useState("default");

  const [sound, setSound] = useState(false);
  const [active, setActive] = useState(false);

  const menuSelections = {
    default: (
      <div className="menu-container">
        <button
          className="menu-item"
          onClick={() => {
            setSound(true);
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
        <button
          className="menu-item"
          onClick={() => {
            setContent("session");
          }}
        >
          session
        </button>
        <button className="menu-item">s</button>
        <button className="menu-item">s</button>
      </div>
    ),
    "sound-select": <div />,
    session: <Session />,
    notes: <Notes />,
  };

  return (
    <>
      <button
        onClick={() => {
          setActive(true);
        }}
      >
        show
      </button>
      <div className={`menu ${active && "menu-active"}`}>
        <h1>menu</h1>
        <button
          onClick={() => {
            setActive(false);
          }}
        >
          shrink
        </button>
        {content !== "default" && (
          <button
            onClick={() => {
              setContent("default");
              setSound(false);
            }}
          >
            go back
          </button>
        )}
        <SoundSelector visibility={sound} />
        {menuSelections[content]}
      </div>
    </>
  );
}

export default Menu;
