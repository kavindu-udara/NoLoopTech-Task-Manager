import { api } from "../api";

// mock global fetch
global.fetch = jest.fn();

describe("API Client", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("getTasks should return an array of tasks on success", async () => {
    const mockTasks = [
      {
        id: "1",
        title: "Test",
        status: "TODO",
        createdAt: new Date().toISOString(),
      },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    });

    const tasks = await api.getTasks();
    expect(tasks).toEqual(mockTasks);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/tasks");
  });

  it("getTasks should throw an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Internal Server Error" }),
    });

    await expect(api.getTasks()).rejects.toThrow("Internal Server Error");
  });
});
