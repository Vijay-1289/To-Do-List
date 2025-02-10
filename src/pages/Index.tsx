
import { useState, useEffect } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskStats } from "@/components/TaskStats";

interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ title, deadline }: { title: string; deadline: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      deadline,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed && new Date(t.deadline) > new Date()).length,
    overdue: tasks.filter((t) => !t.completed && new Date(t.deadline) <= new Date()).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container py-8 px-4 mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Time-Bound Tasks
          </h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>

        <TaskStats {...stats} />
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />
      </div>
    </div>
  );
};

export default Index;
