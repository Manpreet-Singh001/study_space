import React, { useState } from "react";
import axios from "axios";

function Session() {
  const [timeGoal, setTimeGoal] = useState(0);
  const [settings, setSettings] = useState(false);
  // create a session with the details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/study_session/",
        {
          time_goal: timeGoal,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ask user what activity they doing? and for how long
  return (
    <div>
      <div className="">{timeGoal}</div>
      <button type="submit">start</button>
      <button
        onClick={() => {
          setSettings(true);
        }}
      >
        settings
      </button>
      <div className={settings ? "" : "hidden"}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="activity-time">time goal</label>
          <input
            type="number"
            value={timeGoal}
            onChange={(e) => {
              setTimeGoal(e.target.value);
            }}
          />
          <button>save</button>
        </form>
      </div>
    </div>
  );
}

export default Session;
