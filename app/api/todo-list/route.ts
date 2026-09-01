import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loadConfig } from "@/src/config";
import { FORM_ACCESS_COOKIE, hasFormAccess } from "@/src/formAuth";
import { getKanbanTasks } from "@/src/vikunjaClient";

// Always fetch live data — never statically prerendered at build time.
export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken = cookies().get(FORM_ACCESS_COOKIE)?.value;
  if (!hasFormAccess(accessToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
