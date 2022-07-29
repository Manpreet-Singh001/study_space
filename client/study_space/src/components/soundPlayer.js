import { useEffect, useRef, useState } from "react";

function SoundPlayer({ audioSrc, audioName }) {
  const [vol, setVol] = useState("50");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioPlayer.current.loop = true;
  }, []);

  const audioPlayer = useRef(null);

  const play = () => {
    audioPlayer.current.play();
  };

  const pause = () => {
    audioPlayer.current.pause();
  };

  const setPlaybackVol = (vol) => {
    audioPlayer.current.volume = vol / 100;
  };

  return (
    <div>
      {audioName}
      <audio ref={audioPlayer}>
        <source src={audioSrc} />
      </audio>

      {!playing ? (
        <button
          onClick={() => {
            play();
            setPlaying(true);
          }}
        >
          play
        </button>
      ) : (
        <button
          onClick={() => {
            pause();
            setPlaying(false);
          }}
        >
          pause
        </button>
      )}

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={vol}
        onChange={(e) => {
          setVol(e.target.value);
          setPlaybackVol(e.target.value);
        }}
      />
    </div>
  );
}

export default SoundPlayer;
