import React, { useState } from "react";

// has all the audios
// always remains mounted
// turns invisible according if not selected in menu
// should subscribe to menu context or vice-versa???
const AudioManagerContext = React.createContext();

function AudioManager({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AudioManagerContext.Provider value={{ setIsVisible }}>
      {children}
    </AudioManagerContext.Provider>
  );
}

export default AudioManager;
