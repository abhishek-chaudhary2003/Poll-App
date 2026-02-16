import { useState, useEffect } from "react";
import axios from "axios";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [link, setLink] = useState("");

  useEffect(() => {
    const lastId = localStorage.getItem("lastPollId");
    if (lastId) {
      setLink(`${window.location.origin}/poll/${lastId}`);
    }
  }, []);

  const addOption = () => setOptions([...options, ""]);

  const updateOption = (i, value) => {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  };

  const savePollToLocal = (id) => {
    const existing = JSON.parse(localStorage.getItem("myPolls") || "[]");

    if (!existing.includes(id)) {
      existing.push(id);
      localStorage.setItem("myPolls", JSON.stringify(existing));
    }

    localStorage.setItem("lastPollId", id);
  };

  const createPoll = async () => {
    try {
      const res = await axios.post("https://backendpoll.onrender.com/api/polls", {
        question,
        options,
      });

      const id = res.data._id;

      savePollToLocal(id);

      const pollLink = `${window.location.origin}/poll/${id}`;
      setLink(pollLink);

    } catch (err) {
      console.error(err);
      alert("Failed to create poll");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <input
          key={i}
          className="w-full border p-2 mb-2 rounded"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}

      <button onClick={addOption} className="text-blue-600 mb-3">
        + Add Option
      </button>

      <button
        onClick={createPoll}
        className="w-full bg-black text-white p-2 rounded"
      >
        Create Poll
      </button>

      {link && (
        <div className="mt-4 p-3 border rounded">
          <p className="text-sm mb-1">Share this link:</p>
          <a href={link} className="text-blue-600 break-all">
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
