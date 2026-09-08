"use client";
import { useState } from "react";
export default function HomePage() {
  const [source, setSource] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const chat = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-amber-100">
      {" "}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-black">
        {" "}
        <form
          onSubmit={chat}
          className="flex flex-col items-center justify-center space-y-4"
        >
          {" "}
          <span>
            {" "}
            Source:{" "}
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
            />{" "}
          </span>{" "}
          <span>
            {" "}
            Question:{" "}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
            />{" "}
          </span>{" "}
          <button
            type="submit"
            className="bg-amber-500 p-2 hover:bg-blue-700 text-white font-bold rounded"
          >
            {" "}
            Submit{" "}
          </button>{" "}
        </form>{" "}
        <span>Answer: {answer}</span>{" "}
      </div>{" "}
    </div>
  );
}
