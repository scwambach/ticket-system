import { NextResponse } from "next/server";
import { loadConfig } from "@/src/config";
import { getTodoBucketTasks } from "@/src/vikunjaClient";

// Always fetch live data — never statically prerendered at build time.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = loadConfig();
    const tasks = await getTodoBucketTasks(config);
    return NextResponse.json({ tasks });
  } catch (err) {
    console.error("todo-list route failed:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
