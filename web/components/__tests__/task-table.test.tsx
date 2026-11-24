import { render, screen, fireEvent } from "@testing-library/react";
import { Task } from "@/lib/api";
import TaskTable from "../task-table";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task One",
    status: "TODO",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Task Two",
    status: "DONE",
    createdAt: new Date().toISOString(),
  },
];

describe("TaskTable", () => {
  it("renders the empty state when no tasks are provided", () => {
    render(<TaskTable tasks={[]} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });

  it("renders a list of tasks correctly", () => {
    render(
      <TaskTable tasks={mockTasks} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
    expect(screen.getByText("TODO")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", () => {
    const handleEdit = jest.fn();
    render(
      <TaskTable tasks={mockTasks} onEdit={handleEdit} onDelete={jest.fn()} />,
    );

    // Find the edit button for the first task (it has an aria-label)
    const editButton = screen.getByLabelText("Edit Task One");
    fireEvent.click(editButton);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onDelete when the delete button is clicked", () => {
    const handleDelete = jest.fn();
    render(
      <TaskTable
        tasks={mockTasks}
        onEdit={jest.fn()}
        onDelete={handleDelete}
      />,
    );

    const deleteButton = screen.getByLabelText("Delete Task Two");
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockTasks[1]);
  });
});
