"use client";

import { useState } from "react";

export default function HomePage() {
  const [source, setSource] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const chat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!source.trim() || !question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" bg-zinc-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500 mb-4">
            <span className="text-2xl">✦</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Ask Your Source</h1>

          <p className="text-zinc-400 mt-3">
            Give the AI a source and ask questions about it.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={chat} className="space-y-6">
            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Source
              </label>

              <textarea
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Paste your source, document text, or context here..."
                rows={6}
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Question
              </label>

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about your source..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !source.trim() || !question.trim()}
              className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Ask AI →"}
            </button>
          </form>

          {/* Answer */}
          {answer && (
            <div className="mt-8 border-t border-zinc-800 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-black">
                  ✦
                </div>

                <h2 className="font-semibold">AI Answer</h2>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {answer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          Powered by your AI + RAG pipeline
        </p>
      </div>
    </main>
  );
}
