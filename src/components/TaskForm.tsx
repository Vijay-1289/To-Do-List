
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TaskFormProps {
  onAddTask: (task: { title: string; deadline: string }) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !deadline) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddTask({ title, deadline });
    setTitle("");
    setDeadline("");
    
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  return (
    <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full transition-all focus:ring-2"
          />
          <Input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full transition-all focus:ring-2"
          />
        </div>
        <Button type="submit" className="w-full group">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Add Task
        </Button>
      </form>
    </Card>
  );
}
