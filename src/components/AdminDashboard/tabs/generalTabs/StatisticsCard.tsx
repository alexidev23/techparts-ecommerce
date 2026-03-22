import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export default function StatisticsCard({
  title,
  value,
  icon,
}: StatisticsCardProps) {
  return (
    <Card className="w-full border border-gray-200 bg-white rounded-lg dark:bg-gray-950 dark:border-gray-700">
      <CardHeader className="flex items-center justify-between">
        <div aria-hidden="true">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </CardContent>
    </Card>
  );
}
