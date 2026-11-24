import { Task } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusColors = {
  TODO: "secondary",
  IN_PROGRESS: "default",
  DONE: "outline",
} as const;

const TaskTable = ({ tasks, onEdit, onDelete }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border rounded-lg bg-muted/20">
        <p className="text-lg">No tasks found.</p>
        <p className="text-sm">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <Badge variant={statusColors[task.status]}>
                  {task.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                {task.dueDate ? (
                  new Date(task.dueDate).toLocaleDateString()
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  aria-label={`Edit ${task.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  aria-label={`Delete ${task.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
