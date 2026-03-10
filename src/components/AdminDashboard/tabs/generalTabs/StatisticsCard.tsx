import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatisticsCardProps {
  title: string;
  value: number | string;
  percentage: number;
  icon: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatisticsCard({
  title,
  value,
  percentage,
  icon,
}: StatisticsCardProps) {
  const isPositive = percentage >= 0;

  return (
    <Card className="w-full border border-gray-200 bg-white rounded-lg dark:bg-gray-950 dark:border-gray-700">
      <CardHeader className="flex items-center justify-between">
        <div aria-hidden="true">{icon}</div>

        <div
          className={`flex items-center gap-1 text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
          aria-label={`${isPositive ? "Subió" : "Bajó"} un ${Math.abs(percentage)}%`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
          )}
          <span aria-hidden="true">
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
