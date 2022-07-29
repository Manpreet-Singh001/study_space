import React from "react";
import SoundPlayer from "./soundPlayer";
import rain from "../sounds/rain.mp3";
import birds from "../sounds/p.m4a";

function SoundSelector(props) {
  return (
    <ul>
      <SoundPlayer audioSrc={rain} />
      <SoundPlayer audioSrc={birds} />
      <SoundPlayer audioSrc={"./rain.mp3"} />
      <li>birds</li>
      <li>insects</li>
      <li>ambience</li>
      <li>water flowing</li>
    </ul>
  );
}

export default SoundSelector;
