"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchQueryKey } from "@/lib/songFilterRoutingConstants";
import { Input } from "@/components/ui/Input";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(newQuery: string) {
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set(searchQueryKey, newQuery);
    } else {
      params.delete(searchQueryKey);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Input
      placeholder="Filter by title/artist"
      defaultValue={searchParams.get(searchQueryKey) ?? undefined}
      onChange={(e) => handleSearch(e.target.value.trim())}
      className="max-w-md"
    />
  );
};
