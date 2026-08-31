import fetch from "node-fetch";
import { Config } from "./config";

export interface CreateTaskInput {
  title: string;
  description?: string;
}

/**
 * Creates a task in Vikunja via its REST API.
 * See: https://vikunja.io/docs/api/ (PUT /projects/{id}/tasks)
 */
export async function createVikunjaTask(
  config: Config,
  input: CreateTaskInput,
): Promise<void> {
  const url = `${config.vikunjaBaseUrl}/api/v1/projects/${config.vikunjaProjectId}/tasks`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.vikunjaApiToken}`,
    },
    body: JSON.stringify({
      title: input.title,
      description: input.description,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Vikunja task creation failed (${response.status}): ${body}`,
    );
  }
}
