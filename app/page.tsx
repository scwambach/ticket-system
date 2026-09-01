import { cookies } from "next/headers";
import { PasswordModal } from "@/components/password-modal";
import { TicketSystem } from "@/components/ticket-system";
import { FORM_ACCESS_COOKIE, hasFormAccess } from "@/src/formAuth";

export default function Home() {
  const accessToken = cookies().get(FORM_ACCESS_COOKIE)?.value;

  return hasFormAccess(accessToken) ? <TicketSystem /> : <PasswordModal />;
}
