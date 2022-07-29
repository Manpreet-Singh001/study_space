import React, { useEffect } from "react";

function SoundPlayer({ audioSrc }) {
  useEffect(() => {
    audio.loop = true;
  }, []);

  const audio = new Audio(audioSrc);

  return (
    <div>
      rain
      <button
        onClick={() => {
          audio.play();
        }}
      >
        play
      </button>
      <button
        onClick={() => {
          audio.pause();
        }}
      >
        pause
      </button>
    </div>
  );
}

export default SoundPlayer;
