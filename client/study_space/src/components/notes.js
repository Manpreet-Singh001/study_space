import React, { useEffect, useState } from "react";
import axios from "axios";

// get all the topic ids

const getAllTopics = async () => {
  const res = await axios.get("http://localhost:8000/study_session/topics/", {
    withCredentials: true,
  });

  console.log(res.data);
};

function Notes(props) {
  const [newNote, setNewNote] = useState("");
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    getAllTopics();
  }, []);

  const createNote = async () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea id="note-field" name="note-field" cols="30" rows="10">
          {newNote}
        </textarea>
        <div></div>
        <label htmlFor="topic-name">topic name</label>
        <input
          id="topic-name"
          type="text"
          value={topicName}
          onChange={(e) => {
            setTopicName(e.target.value);
          }}
        />
        <button type="submit">create note</button>
      </form>
      <div>all my notes here</div>
    </div>
  );
}

export default Notes;
