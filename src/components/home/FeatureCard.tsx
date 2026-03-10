import type { FeatureItem } from "@/types/homeTypes";

export function FeatureCard({ icon: Icon, title, description }: FeatureItem) {
  return (
    <article className="flex gap-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
}
