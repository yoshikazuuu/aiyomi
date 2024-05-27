import { Keys } from "@/components/keys";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Manga() {
  return (
    <div className="flex min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <ArrowUp />
      <span className="text-xl max-w-xs text-center">
        Search your manga by clicking that search tab in top or press{" "}
        <Keys>
          <span className="text-xs">⌘</span>K
        </Keys>{" "}
        to use keyboard shortcut.
      </span>
    </div>
  );
}
