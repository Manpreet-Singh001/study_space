import React from "react";
import SoundPlayer from "./soundPlayer";
import rain from "../sounds/rain.mp3";
import birds from "../sounds/birds.mp3";
import underwater from "../sounds/underwater.mp3";

function SoundSelector({ visibility }) {
  return (
    <div className={visibility ? "visible" : "hidden"}>
      <SoundPlayer audioSrc={rain} audioName={"rain"} />
      <SoundPlayer audioSrc={birds} audioName={"birds"} />
      <SoundPlayer audioSrc={underwater} audioName={"water"} />
      <li>insects</li>
      <li>ambience</li>
      <li>water flowing</li>
    </div>
  );
}

export default SoundSelector;
