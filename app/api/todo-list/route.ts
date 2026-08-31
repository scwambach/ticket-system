import { NextResponse } from "next/server";
import { loadConfig } from "@/src/config";
import { getKanbanTasks } from "@/src/vikunjaClient";

// Always fetch live data — never statically prerendered at build time.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = loadConfig();
    const { todo, doing } = await getKanbanTasks(config);
    return NextResponse.json({ todo, doing });
  } catch (err) {
    console.error("todo-list route failed:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
