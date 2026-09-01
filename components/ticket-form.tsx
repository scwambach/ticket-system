"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function TicketForm() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: trimmed,
          description: description.trim(),
          dueDate,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }

      setStatus("success");
      setMessage("TICKET CREATED!");
      setText("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message.toUpperCase()
          : "SOMETHING WENT WRONG.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl border-4 border-black bg-white p-8 shadow-brutal-lg"
    >
      <h1 className="mb-6 -rotate-1 inline-block bg-brutal-pink border-4 border-black px-4 py-2 text-3xl font-black uppercase tracking-tight shadow-brutal-sm">
        New Ticket
      </h1>
      <label className="mt-4 block text-sm font-black uppercase">
        Title<sup className="text-red-600 ml-1">*</sup>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="WHAT DO YOU NEED SCOTT TO DO?"
          autoFocus
          required
          className="w-full border-4 border-black bg-brutal-yellow px-4 py-4 text-xl font-bold uppercase placeholder:text-black/50 outline-none focus:shadow-brutal-sm"
        />
      </label>

      <label className="mt-4 block text-sm font-black uppercase">
        Due date <span className="text-black/60">(Optional)</span>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full border-4 border-black bg-brutal-yellow px-4 py-3 text-lg font-bold outline-none focus:shadow-brutal-sm placeholder:text-black/50"
        />
      </label>

      <label className="mt-4 block text-sm font-black uppercase">
        Description <span className="text-black/60">(Optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ADD CONTEXT, LINKS, OR A CHECKLIST..."
          rows={5}
          className="mt-1 block w-full resize-y border-4 border-black bg-brutal-yellow px-4 py-3 text-base font-bold placeholder:text-black/50 outline-none focus:shadow-brutal-sm"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full border-4 border-black bg-brutal-blue px-4 py-4 text-xl font-black uppercase text-black shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Creating..." : "MAKE SCOTT DO IT"}
      </button>

      {message && (
        <p
          className={`mt-4 border-4 border-black px-4 py-3 text-center text-lg font-black uppercase ${
            status === "error" ? "bg-red-500" : "bg-green-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="my-6 border-4 border-black bg-brutal-yellow/60 px-3 py-2 text-sm font-bold leading-snug">
        This is the ONLY known method for getting Scott to actually do
        something. Texting, calling, yelling across the room — none of it works.
        Type it below or forever hold your peace.
      </p>

      <p className="mt-4 text-center text-xs font-bold uppercase tracking-wide text-black/60">
        No refunds. No excuses. Scott has been notified (eventually).
      </p>
    </form>
  );
}
