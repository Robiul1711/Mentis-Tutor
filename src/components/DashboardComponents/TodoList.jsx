import React, { useState } from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'view'
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const { data: todoTasks, isLoading } = useApiQuery({
    queryKey: ["todo-tasks"],
    url: `/todo-tasks`,
    secure: true,
  });

  const { mutate: createTask, isPending: createTaskPending } = useApiMutation({
    url: "/todo-tasks",
    method: "POST",
    secure: true,
    invalidateKeys: ["todo-tasks"],
    onSuccess: () => {
      setIsModalOpen(false);
      resetForm();
    },
  });

  const { mutate: updateTask, isPending: updateTaskPending } = useApiMutation({
    url: "/todo-tasks/:id",
    method: "POST",
    secure: true,
    invalidateKeys: ["todo-tasks"],
    onSuccess: () => {
      setIsModalOpen(false);
      resetForm();
    },
  });

  const { mutate: deleteTask, isPending: deleteTaskPending } = useApiMutation({
    url: "/todo-tasks/:id",
    method: "DELETE",
    secure: true,
    invalidateKeys: ["todo-tasks"],
    successMessage: "Task deleted successfully",
  });

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setSelectedTask(null);
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e, task) => {
    e.stopPropagation();
    setModalMode("edit");
    setSelectedTask(task);
    setFormData({ title: task.title, description: task.description || "" });
    setIsModalOpen(true);
  };

  const handleOpenView = (task) => {
    setModalMode("view");
    setSelectedTask(task);
    setFormData({ title: task.title, description: task.description || "" });
    setIsModalOpen(true);
  };

  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask({ id: taskId });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      createTask(formData);
    } else if (modalMode === "edit") {
      updateTask({ ...formData, id: selectedTask.id });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 font-poppins">Your To-Do List</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const tasks = todoTasks?.data?.tasks || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 font-poppins">Your To-Do List</h2>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <div
              key={task.id || idx}
              onClick={() => handleOpenView(task)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-Primary transition-colors"></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleOpenEdit(e, task)}
                  className="p-1.5 text-slate-400 hover:text-Primary hover:bg-Primary/10 rounded-lg transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={(e) => handleDelete(e, task.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 py-4 text-center">No tasks found. Add a new one!</p>
        )}

        <div className="pt-4 flex items-center justify-between">
          <button
            onClick={handleOpenAdd}
            className="text-Primary font-semibold text-sm flex items-center gap-1 hover:underline group"
          >
            <Plus size={18} className="transition-transform group-hover:scale-110" /> 
            Add Task
          </button>
          <button className="bg-Primary hover:opacity-90 text-white px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors shadow-sm active:scale-95">
            Save
          </button>
        </div>
      </div>

      {/* Todo Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white dark:bg-[#0B1120] rounded-2xl border-none shadow-2xl p-0 overflow-hidden max-w-md">
          <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle className="text-xl font-bold font-poppins text-slate-800 dark:text-white capitalize">
              {modalMode === "view" ? "Task Details" : modalMode === "edit" ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Title</label>
              {modalMode === "view" ? (
                <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-medium">
                  {formData.title}
                </p>
              ) : (
                <Input
                  required
                  placeholder="Task title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 h-11 rounded-xl focus:ring-Primary"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
              {modalMode === "view" ? (
                <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 min-h-[100px] whitespace-pre-wrap leading-relaxed">
                  {formData.description || "No description provided."}
                </p>
              ) : (
                <textarea
                  placeholder="Task description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-Primary text-sm transition-all"
                />
              )}
            </div>

            {modalMode !== "view" && (
              <DialogFooter className="pt-4 flex justify-between! gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border-slate-200 dark:border-slate-800 px-6"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createTaskPending || updateTaskPending}
                  className="bg-Primary hover:opacity-90 text-white rounded-xl px-8 shadow-sm"
                >
                  {createTaskPending || updateTaskPending ? "Saving..." : modalMode === "edit" ? "Update Task" : "Add Task"}
                </Button>
              </DialogFooter>
            )}
            
            {modalMode === "view" && (
              <div className="pt-4 flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => setModalMode("edit")}
                  className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-6 flex items-center gap-2"
                >
                  <Pencil size={14} /> Edit Task
                </Button>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoList;
