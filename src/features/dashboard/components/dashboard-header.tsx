"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { HeadphonesIcon, ThumbsUpIcon } from "lucide-react";

export default function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to see you</p>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          {isLoaded ? user?.fullName ?? user?.firstName ?? "Guest" : "..."}
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button size="sm" variant={"outline"} asChild>
          <Link href={"mailto:jankarloafable@gmail.com"}>
            <ThumbsUpIcon />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button size="sm" variant={"outline"} asChild>
          <Link href={"mailto:jankarloafable@gmail.com"}>
            <HeadphonesIcon />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
