"use client";

import { useState } from "react";

export function PasswordModal() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/form-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error("Incorrect password");
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-4 border-black bg-white p-6 shadow-brutal-lg"
      >
        <h1 className="inline-block -rotate-1 border-4 border-black bg-brutal-pink px-3 py-1 text-2xl font-black uppercase shadow-brutal-sm">
          Password Required
        </h1>
        <label className="mt-6 block text-sm font-black uppercase">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            required
            className="mt-1 block w-full border-4 border-black bg-brutal-yellow px-4 py-3 text-lg font-bold outline-none focus:shadow-brutal-sm"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full border-4 border-black bg-brutal-blue px-4 py-3 text-lg font-black uppercase shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg active:translate-x-0 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Checking..." : "Unlock Form"}
        </button>
        {error && (
          <p className="mt-4 border-4 border-black bg-red-500 px-4 py-3 text-center font-black uppercase text-white">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}