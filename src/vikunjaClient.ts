import fetch from "node-fetch";
import { Config } from "./config";

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface TodoItem {
  id: number;
  title: string;
}

interface VikunjaView {
  id: number;
  view_kind: string;
}

interface VikunjaBucket {
  title: string;
  tasks: { id: number; title: string; done: boolean }[];
}

async function vikunjaFetch<T>(config: Config, path: string): Promise<T> {
  const response = await fetch(`${config.vikunjaBaseUrl}/api/v1${path}`, {
    headers: { Authorization: `Bearer ${config.vikunjaApiToken}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vikunja request failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
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
      due_date: input.dueDate ? `${input.dueDate}T00:00:00Z` : undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Vikunja task creation failed (${response.status}): ${body}`,
    );
  }
}

/**
 * Returns the not-done tasks sitting in the project's "To-Do" and "Doing"
 * Kanban buckets (bucket names configurable via TODO_BUCKET_NAME /
 * DOING_BUCKET_NAME).
 */
export async function getKanbanTasks(
  config: Config,
): Promise<{ todo: TodoItem[]; doing: TodoItem[] }> {
  const views = await vikunjaFetch<VikunjaView[]>(
    config,
    `/projects/${config.vikunjaProjectId}/views`,
  );

  const kanbanView = views.find((view) => view.view_kind === "kanban");
  if (!kanbanView) {
    throw new Error(
      "This project has no Kanban view, so there's no To-Do bucket to read.",
    );
  }

  // The buckets endpoint doesn't embed tasks; the view's tasks endpoint does for kanban views.
  const buckets = await vikunjaFetch<VikunjaBucket[]>(
    config,
    `/projects/${config.vikunjaProjectId}/views/${kanbanView.id}/tasks`,
  );

  const findBucketTasks = (bucketName: string): TodoItem[] => {
    const bucket = buckets.find(
      (b) => b.title.trim().toLowerCase() === bucketName.trim().toLowerCase(),
    );
    if (!bucket) {
      throw new Error(`No bucket named "${bucketName}" was found.`);
    }
    return (bucket.tasks ?? [])
      .filter((task) => !task.done)
      .map((task) => ({ id: task.id, title: task.title }));
  };

  return {
    todo: findBucketTasks(config.todoBucketName),
    doing: findBucketTasks(config.doingBucketName),
  };
}
