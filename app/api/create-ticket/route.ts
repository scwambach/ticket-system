import { NextResponse } from "next/server";
import { loadConfig } from "@/src/config";
import { createVikunjaTask } from "@/src/vikunjaClient";
import { sendTicketNotification } from "@/src/mailer";

const MAX_TITLE_LENGTH = 250;

export async function POST(request: Request) {
  let payload: { text?: unknown; description?: unknown; dueDate?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, description, dueDate } = payload;

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "'text' is required" }, { status: 400 });
  }

  const trimmed = text.trim();
  if (typeof description !== "undefined" && typeof description !== "string") {
    return NextResponse.json(
      { error: "'description' must be a string" },
      { status: 400 },
    );
  }
  if (typeof dueDate !== "undefined" && typeof dueDate !== "string") {
    return NextResponse.json(
      { error: "'dueDate' must be a date string" },
      { status: 400 },
    );
  }

  try {
    const config = loadConfig();
    await createVikunjaTask(config, {
      title: trimmed.slice(0, MAX_TITLE_LENGTH),
      description: description?.trim() || undefined,
      dueDate: dueDate || undefined,
    });

    try {
      await sendTicketNotification(config, trimmed);
    } catch (mailErr) {
      // Ticket was still created successfully even if the notification email fails.
      console.error("Ticket notification email failed:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("create-ticket route failed:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
