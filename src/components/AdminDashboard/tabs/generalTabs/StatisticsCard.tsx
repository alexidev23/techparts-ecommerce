import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StadisticsCardsProps {
  title: string;
  value: number | string;
  percentage: number;
  icon: React.ReactNode;
}

export default function StatisticsCard({
  title,
  value,
  percentage,
  icon,
}: StadisticsCardsProps) {
  const isPositive = percentage >= 0;
  return (
    <Card className="border border-gray-200 bg-white rounded-lg w-75 dark:bg-gray-950 dark:border-gray-700">
      <CardHeader className="flex items-center justify-between">
        <div>{icon}</div>

        <div
          className={`flex items-center gap-1 text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {percentage}%
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </CardContent>
    </Card>
  );
}
