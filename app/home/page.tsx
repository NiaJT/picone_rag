"use client";
const chat = async () => {
  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source:
        "Niraj Thapa is a web developer working at a tech company. He specializes in building responsive web applications using modern JavaScript frameworks.",
      question: "Who is niraj thapa?",
    }),
  });
};
export default function HomePage() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Enter source" />
        <input type="text" placeholder="Enter question" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={chat}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
