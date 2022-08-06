import React from "react";
import Menu from "../components/menu";
import Boid from "../components/sketches/Boid";
import { SessionContext, SessionContextProvider } from "../context/session";

function Home(props) {
  return (
    <div>
      <SessionContextProvider>
        <Menu />
      </SessionContextProvider>
      <Boid />
    </div>
  );
}

export default Home;
