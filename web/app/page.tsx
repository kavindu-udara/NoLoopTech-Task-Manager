"use client";
import DeleteDialog from "@/components/delete-dialog";
import TaskDialog from "@/components/task-dialog";
import TaskTable from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api, CreateTaskDto, Task } from "@/lib/api";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const getErrorMessage = (
  error: unknown,
  fallback = "An unexpected error occurred",
) => (error instanceof Error && error.message ? error.message : fallback);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Failed to fetch tasks"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    api
      .getTasks()
      .then((data) => {
        if (isMounted) setTasks(data);
      })
      .catch((error: unknown) => {
        if (isMounted) setError(getErrorMessage(error, "Failed to fetch tasks"));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (data: CreateTaskDto) => {
    try {
      await api.createTask(data);
      toast.success("Task created successfully", { position: "bottom-right" });
      fetchTasks();
      setIsFormOpen(false);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error), { position: "bottom-right" });
    }
  };

  const handleUpdate = async (id: string, data: CreateTaskDto) => {
    try {
      await api.updateTask(id, data);
      toast.success("Task updated successfully", { position: "bottom-right" });
      fetchTasks();
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error), { position: "bottom-right" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteTask(id);
      toast.success("Task deleted successfully", { position: "bottom-right" });
      fetchTasks();
      setDeletingTask(null);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error), { position: "bottom-right" });
    }
  };

  return (
    <main className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
        <Button
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
          <p className="font-semibold text-lg">Error loading tasks</p>
          <p className="text-sm mb-4">{error}</p>
          <Button variant="outline" onClick={fetchTasks}>
            Retry
          </Button>
        </div>
      ) : (
        <TaskTable
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsFormOpen(true);
          }}
          onDelete={setDeletingTask}
        />
      )}

      <TaskDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        task={editingTask}
        onSubmit={
          editingTask
            ? (data) => handleUpdate(editingTask.id, data)
            : handleCreate
        }
      />

      <DeleteDialog
        task={deletingTask}
        onConfirm={() => deletingTask && handleDelete(deletingTask.id)}
        onOpenChange={(open) => !open && setDeletingTask(null)}
      />
    </main>
  );
}
