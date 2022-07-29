import React from "react";
import SoundPlayer from "./soundPlayer";
import rain from "../sounds/rain.mp3";
import birds from "../sounds/birds.mp3";

function SoundSelector(props) {
  return (
    <ul>
      <SoundPlayer audioSrc={rain} audioName={"rain"} />
      <SoundPlayer audioSrc={birds} audioName={"birds"} />
      <li>birds</li>
      <li>insects</li>
      <li>ambience</li>
      <li>water flowing</li>
    </ul>
  );
}

export default SoundSelector;
