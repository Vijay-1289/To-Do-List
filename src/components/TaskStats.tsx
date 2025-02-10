
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, ListTodo, AlertCircle } from "lucide-react";

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

export function TaskStats({ total, completed, pending, overdue }: TaskStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Tasks"
        value={total}
        icon={ListTodo}
        className="bg-gray-100"
      />
      <StatCard
        title="Completed"
        value={completed}
        icon={CheckCircle}
        className="bg-green-100"
      />
      <StatCard
        title="Pending"
        value={pending}
        icon={Clock}
        className="bg-yellow-100"
      />
      <StatCard
        title="Overdue"
        value={overdue}
        icon={AlertCircle}
        className="bg-red-100"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  className,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  className?: string;
}) {
  return (
    <Card className={`p-4 transition-all hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="h-8 w-8 opacity-75" />
      </div>
    </Card>
  );
}
