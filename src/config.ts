export interface Config {
  vikunjaBaseUrl: string;
  vikunjaApiToken: string;
  vikunjaProjectId: number;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  notifyEmailTo: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function loadConfig(): Config {
  return {
    vikunjaBaseUrl: requireEnv("VIKUNJA_BASE_URL").replace(/\/+$/, ""),
    vikunjaApiToken: requireEnv("VIKUNJA_API_TOKEN"),
    vikunjaProjectId: Number(requireEnv("VIKUNJA_PROJECT_ID")),
    smtpHost: requireEnv("SMTP_HOST"),
    smtpPort: Number(process.env.SMTP_PORT || "465"),
    smtpUser: requireEnv("SMTP_USER"),
    smtpPass: requireEnv("SMTP_PASS"),
    notifyEmailTo: requireEnv("NOTIFY_EMAIL_TO"),
  };
}
