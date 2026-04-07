import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-light">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant={"outline"} asChild>
          <Link href={"mailto:jankarloafable@gmail.com"}>
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button size="sm" variant={"outline"} asChild>
          <Link href={"mailto:jankarloafable@gmail.com"}>
            <Headphones />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
