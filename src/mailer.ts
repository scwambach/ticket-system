import nodemailer from "nodemailer";
import { Config } from "./config";

/**
 * Sends an all-caps email notification to Scott whenever a ticket is created.
 */
export async function sendTicketNotification(
  config: Config,
  ticketText: string,
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const shout = ticketText.toUpperCase();

  await transporter.sendMail({
    from: config.smtpUser,
    to: config.notifyEmailTo,
    subject: `NEW TICKET: ${shout}`,
    text: `HEY SCOTT. SOMEONE MADE YOU A TICKET. HERE IT IS:\n\n${ticketText}\n\nGO DO IT.`,
  });
}
