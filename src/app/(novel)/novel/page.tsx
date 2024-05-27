import { Keys } from "@/components/keys";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function LightNovel() {
  return (
    <div className="flex min-h-[calc(100dvh-10rem)] flex-col w-screen justify-center items-center gap-2">
      <div className="absolute -z-10 -mt-[100px] h-screen w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-400/30 via-red-50/0 transition-colors dark:from-teal-600/30 dark:via-red-50/0" />
      <span className="text-4xl animate-pulse">🚧 🚧 🚧</span>
      <span className="text-lg max-w-xs text-balance text-center">
        Page is under construction. Please come back later.
      </span>
    </div>
  );
}
