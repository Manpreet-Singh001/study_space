import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SessionContext } from "../context/session";

function Session() {
  const [settings, setSettings] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const { sessionData, setSessionData } = useContext(SessionContext);

  useEffect(() => {
    if (!startTime) {
      return;
    }
    const interval = setInterval(() => {
      const currentTime = new Date();
      const diff = (currentTime.getTime() - startTime.getTime()) / 1000;
      setTimeRemaining(Math.floor(diff));
    }, 1000);

    return () => {
      if (!interval) {
        return;
      }
      clearInterval(interval);
    };
  }, [startTime]);

  // create a session with the details
  const handleSubmit = async (e) => {
    setStartTime(new Date());

    try {
      const res = await axios.post(
        "http://localhost:8000/study_session/",
        {
          time_goal: sessionData.goal,
        },
        { withCredentials: true }
      );

      const { id } = res.data;
      setSessionData({ ...sessionData, id });
    } catch (err) {
      console.log(err);
    }
  };

  // start the timer for what happens when goal is achieved
  const startTimer = async () => {
    setTimeout(() => {
      // play the end sound
      // update the number of session-completed
      // send the request asking session to end
    }, sessionData.goal);
  };

  const stopSession = async () => {
    //
    setStartTime(null);
    try {
      // logged in behavior
      const { id } = sessionData;
      // send request to end the session
      // find if session was success
    } catch (e) {
      // anonymous user behavior

      const currentTime = new Date();
      const diff = (currentTime.getTime() - startTime.getTime()) / 1000;
      if (Math.floor(diff / 60) >= sessionData.goal) {
        console.log("success");
      }
    }
  };

  // ask user what activity they doing? and for how long
  return (
    <div>
      {!startTime ? (
        <>
          <div className="">{sessionData.goal}</div>
          <button onClick={handleSubmit}>start</button>
        </>
      ) : (
        <div>
          <div>{timeRemaining}</div>
          <button onClick={stopSession}>stop</button>
        </div>
      )}

      <button
        onClick={() => {
          setSettings(true);
        }}
      >
        settings
      </button>
      <div className={settings ? "" : "hidden"}>
        <label htmlFor="activity-time">time goal</label>
        <input
          type="number"
          value={sessionData.goal}
          onChange={(e) => {
            setSessionData({ ...sessionData, goal: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

export default Session;
