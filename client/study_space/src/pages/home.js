import React from "react";
import Menu from "../components/menu";
import Boid from "../components/sketches/Boid";

function Home(props) {
  return (
    <div>
      <Menu />
      <Boid />
    </div>
  );
}

export default Home;
