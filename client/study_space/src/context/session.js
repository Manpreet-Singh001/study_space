import React, { useState } from "react";

const SessionContext = React.createContext();

function SessionContextProvider({ children }) {
  const [sessionData, setSessionData] = useState({ goal: 20, id: null });

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionContextProvider };
