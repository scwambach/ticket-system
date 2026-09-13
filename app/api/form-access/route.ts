import { NextResponse } from "next/server";
import {
  FORM_ACCESS_COOKIE,
  FORM_ACCESS_MAX_AGE,
  getFormAccessToken,
  isValidFormPassword,
} from "@/src/formAuth";

export async function POST(request: Request) {
  let password: unknown;
  try {
    password = (await request.json()).password;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof password !== "string" || !isValidFormPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const isSecureRequest =
    new URL(request.url).protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";

  const response = NextResponse.json({ ok: true });
  response.cookies.set(FORM_ACCESS_COOKIE, getFormAccessToken(), {
    httpOnly: true,
    maxAge: FORM_ACCESS_MAX_AGE,
    path: "/",
    sameSite: isSecureRequest ? "none" : "lax",
    secure: isSecureRequest,
  });
  return response;
}
