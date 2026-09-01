"use client";

import { useState } from "react";
import { TaskDrawer } from "@/components/task-drawer";
import { TicketForm } from "@/components/ticket-form";

export function TicketSystem() {
  const [showTodos, setShowTodos] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-xl rotate-1 border-4 border-black bg-red-500 px-4 py-3 text-center shadow-brutal-sm">
        <p className="text-xl font-black uppercase tracking-tight text-white">
          ⚠️ WARNING: BE AWARE THAT THIS MAKES A TASK FOR ONLY SCOTT WAMBACH ⚠️
        </p>
      </div>

      <TicketForm />

      <button
        type="button"
        onClick={() => setShowTodos(true)}
        className="w-full max-w-xl -rotate-1 border-4 border-black bg-brutal-pink px-4 py-3 text-lg font-black uppercase shadow-brutal-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
      >
        SEE WHAT SCOTT STILL HASN'T DONE
      </button>

      <TaskDrawer isOpen={showTodos} onClose={() => setShowTodos(false)} />
    </main>
  );
}