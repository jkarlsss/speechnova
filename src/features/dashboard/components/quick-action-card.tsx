import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { QuickActions } from "../data/quick-actions";

type QuickActionCardProps = QuickActions;

export default function QuickActionCard({
  title,
  description,
  gradient,
  href,
}: QuickActionCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-3">
      {/* Visual placeholder with gradient */}
      <div
        className={cn(
          "relative h-31 w-41 shrink-0 rounded-xl overflow-hidden bg-linear-to-br",
          gradient,
        )}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-12 rounded-full bg-white/30" />
        </div>

        <div className="absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <Button asChild variant={"outline"} size={"xs"} className="w-fit">
          <Link href={href}>
            Try now
            <ArrowRightIcon size={3} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
