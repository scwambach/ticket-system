import { NextResponse } from "next/server";
import { loadConfig } from "@/src/config";
import { createVikunjaTask } from "@/src/vikunjaClient";
import { sendTicketNotification } from "@/src/mailer";

const MAX_TITLE_LENGTH = 250;

export async function POST(request: Request) {
  let text: unknown;
  try {
    text = (await request.json()).text;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "'text' is required" }, { status: 400 });
  }

  const trimmed = text.trim();

  try {
    const config = loadConfig();
    await createVikunjaTask(config, {
      title: trimmed.slice(0, MAX_TITLE_LENGTH),
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
