import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface HelpItemProps {
  title: string;
  description: string;
  item: LucideIcon;
  modal?: Array<{
    title?: string;
    description?: string | string[];
  }>;
}

export default function HelpItems({
  title,
  description,
  item,
  modal,
}: HelpItemProps) {
  const Icon = item;

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm transition-colors hover:bg-muted/40">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Dialog */}
      {modal && (
        <Dialog>
          <DialogTrigger
            className="inline-flex items-center text-sm font-medium text-primary hover:underline focus:outline-none"
            aria-label={`Ver más sobre ${title}`}
          >
            Ver más
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] overflow-y-auto">
            {modal.map((section, index) => (
              <div key={index} className="mb-6 last:mb-0">
                {section.title && (
                  <DialogHeader>
                    <DialogTitle>{section.title}</DialogTitle>
                  </DialogHeader>
                )}

                {section.description && (
                  <DialogDescription className="mt-2 text-muted-foreground space-y-2">
                    {Array.isArray(section.description)
                      ? section.description.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))
                      : section.description}
                  </DialogDescription>
                )}
              </div>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
