import { createHmac, timingSafeEqual } from "crypto";

export const FORM_ACCESS_COOKIE = "ticket_form_access";
export const FORM_ACCESS_MAX_AGE = 60 * 60 * 24 * 365 * 10;

function getFormPassword(): string {
  const password = process.env.FORM_PASSWORD;
  if (!password) {
    throw new Error("Missing required environment variable: FORM_PASSWORD");
  }
  return password;
}

function createAccessToken(): string {
  return createHmac("sha256", getFormPassword())
    .update("ticket-form-access")
    .digest("hex");
}

export function isValidFormPassword(password: string): boolean {
  const expected = Buffer.from(getFormPassword());
  const supplied = Buffer.from(password);
  return (
    expected.length === supplied.length && timingSafeEqual(expected, supplied)
  );
}

export function hasFormAccess(accessToken?: string): boolean {
  if (!accessToken) return false;
  const expected = Buffer.from(createAccessToken());
  const supplied = Buffer.from(accessToken);
  return (
    expected.length === supplied.length && timingSafeEqual(expected, supplied)
  );
}

export function getFormAccessToken(): string {
  return createAccessToken();
}