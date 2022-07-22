import React, { useState } from "react";

function Greeting() {
  const [activityName, setActivityName] = useState("");
  const [timeGoal, setTimeGoal] = useState(0);

  // create a session with the details
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // ask user what activity they doing? and for how long
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity-name">what are you going to do?</label>
        <input
          type="text"
          id="activity-name"
          value={activityName}
          onChange={(e) => {
            setActivityName(e.target.value);
          }}
        />
        <label htmlFor="activity-time">time in minutes</label>
        <input
          type="number"
          value={timeGoal}
          onChange={(e) => {
            setTimeGoal(e.target.value);
          }}
        />
        <button type="submit">start</button>
      </form>
    </div>
  );
}

export default Greeting;
