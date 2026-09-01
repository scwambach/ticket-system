"use client";

import { useEffect, useState } from "react";

interface TodoItem {
  id: number;
  title: string;
  dueDate?: string;
}

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function TaskItem({ task, className }: { task: TodoItem; className: string }) {
  return (
    <li
      className={`border-4 border-black px-3 py-2 font-bold uppercase shadow-brutal-sm ${className}`}
    >
      <p>{task.title}</p>
      {task.dueDate && (
        <p className="mt-1 text-xs text-black/70">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </li>
  );
}

export function TaskDrawer({ isOpen, onClose }: TaskDrawerProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [doing, setDoing] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    async function loadTasks() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/todo-list");
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.error || `Request failed (${response.status})`);
        }
        setTodos(body.todo);
        setDoing(body.doing);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message.toUpperCase()
            : "SOMETHING WENT WRONG.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadTasks();
  }, [isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l-4 border-black bg-white p-6 shadow-brutal-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="-rotate-1 inline-block border-4 border-black bg-brutal-yellow px-3 py-1 text-xl font-black uppercase shadow-brutal-sm">
            Scott's List
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="border-4 border-black bg-brutal-blue px-3 py-1 text-lg font-black uppercase shadow-brutal-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            X
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          {isLoading && (
            <p className="text-center font-bold uppercase">Loading...</p>
          )}

          {error && (
            <p className="border-4 border-black bg-red-500 px-4 py-3 text-center font-black uppercase text-white">
              {error}
            </p>
          )}

          {!isLoading && !error && todos.length === 0 && (
            <p className="text-center font-bold uppercase">
              Nothing here. Scott is (allegedly) caught up.
            </p>
          )}

          {!isLoading && !error && todos.length > 0 && (
            <ul className="flex flex-col gap-3">
              {todos.map((todo) => (
                <TaskItem
                  key={todo.id}
                  task={todo}
                  className="bg-brutal-pink"
                />
              ))}
            </ul>
          )}

          {!isLoading && !error && (
            <>
              <h3 className="mb-3 mt-8 -rotate-1 inline-block border-4 border-black bg-brutal-yellow px-3 py-1 text-lg font-black uppercase shadow-brutal-sm">
                Currently "Doing" <small className="text-sm">(Allegedly)</small>
              </h3>

              {doing.length === 0 ? (
                <p className="text-center font-bold uppercase">
                  Nothing in progress. Shocking.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {doing.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      className="bg-green-400"
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
