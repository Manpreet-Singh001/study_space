import React, { useState } from "react";
import axios from "axios";

function Session() {
  const [activityName, setActivityName] = useState("");
  const [activityCategory, setActivityCategory] = useState("");
  const [timeGoal, setTimeGoal] = useState(0);

  // create a session with the details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/study_session/",
        {
          topic_name: activityName,
          category: activityCategory,
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
        <label htmlFor="activity-name">category</label>
        <input
          type="text"
          id="activity-category"
          value={activityCategory}
          onChange={(e) => {
            setActivityCategory(e.target.value);
          }}
        />
        <label htmlFor="activity-time">time goal</label>
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

export default Session;
