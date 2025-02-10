
import { useEffect, useState } from "react";
import { Check, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}

export function TaskList({ tasks, onDeleteTask, onToggleTask }: TaskListProps) {
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return a.completed ? 1 : -1;
    });
    setSortedTasks(sorted);
  }, [tasks]);

  const isOverdue = (deadline: string) => {
    return new Date(deadline).getTime() < Date.now();
  };

  const getTimeLeft = (deadline: string) => {
    const diff = new Date(deadline).getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return "Overdue";
    if (hours > 24) return `${Math.floor(hours / 24)}d left`;
    if (hours > 0) return `${hours}h left`;
    return `${minutes}m left`;
  };

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <Card
          key={task.id}
          className={`p-4 transition-all animate-task-appear hover:shadow-lg ${
            task.completed
              ? "bg-task-completed/30"
              : isOverdue(task.deadline)
              ? "bg-task-overdue/30"
              : "bg-task-pending/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleTask(task.id)}
                className={`transition-all hover:scale-110 ${
                  task.completed ? "text-green-500" : "text-gray-400"
                }`}
              >
                <Check className="h-5 w-5" />
              </Button>
              <div>
                <h3
                  className={`font-medium ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{getTimeLeft(task.deadline)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className={`${
                  task.completed
                    ? "bg-green-100 text-green-800"
                    : isOverdue(task.deadline)
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.completed ? "Completed" : isOverdue(task.deadline) ? "Overdue" : "Pending"}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition-all hover:scale-110"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
