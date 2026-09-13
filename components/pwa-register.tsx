"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function PwaRegister() {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) =>
          console.error("Service worker registration failed", error),
        );
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  async function handleInstall() {
    if (!installPromptEvent) {
      return;
    }

    installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
  }

  if (!installPromptEvent) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50">
      <div className="flex items-center justify-between gap-3 border-4 border-black bg-brutal-yellow px-4 py-3 shadow-brutal-sm">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-black/70">
            Install app
          </p>
          <p className="text-sm font-black uppercase text-black">
            Add this to your home screen
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInstallPromptEvent(null)}
            className="border-2 border-black bg-transparent px-3 py-2 text-xs font-black uppercase text-black"
          >
            Later
          </button>
          <button
            type="button"
            onClick={handleInstall}
            className="border-2 border-black bg-brutal-blue px-3 py-2 text-xs font-black uppercase text-black shadow-brutal-sm"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
