export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// err handler
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(error.message || `Error ${res.status}`);
  }
  return res.json();
}

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const res = await fetch(`${API_URL}/tasks`);
    return handleResponse<Task[]>(res);
  },
  createTask: async (data: CreateTaskDto): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },
  updateTask: async (id: string, data: UpdateTaskDto): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },
  deleteTask: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    return handleResponse<void>(res);
  },
};
