"use client";

import { useTheme } from "next-themes";
import { Cog6ToothIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { ClientOnly } from "./ClientOnly";
import { Theme } from "./ThemeProvider";

export function ThemeToggleGroup({ className }: { className?: string }) {
  return (
    <ClientOnly>
      <HydrationUnsafeThemeToggleGroup className={className} />
    </ClientOnly>
  );
}

// This component is hydration-unsafe. On the server, `useTheme` will return a
// `theme` of `undefined`, whereas the theme will be defined on the client. So
// we'll get a hydration mismatch if we render this component on the server.
// To avoid that, `ThemeToggleGroup` wraps this component in `ClientOnly`.
// For more, see the docs  on avoiding hydration mismatches:
// https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
function HydrationUnsafeThemeToggleGroup({
  className,
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      type="single"
      size="sm"
      className={className}
      value={theme}
      onValueChange={(newTheme) => {
        // Ensure there is always a selected theme by checking if `newTheme` is
        // truthy. If the user clicks the already-selected theme, then `newTheme`
        // will be an empty string.
        if (newTheme) {
          setTheme(newTheme as Theme);
        }
      }}
    >
      <ToggleGroupItem value={Theme.LIGHT} aria-label="Set light mode">
        <SunIcon className="size-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value={Theme.DARK} aria-label="Set dark mode">
        <MoonIcon className="size-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value={Theme.SYSTEM}
        aria-label="Set color theme to system preference"
      >
        <Cog6ToothIcon className="size-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
