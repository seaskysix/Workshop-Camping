"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Debounce search input changes
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 500);

  useEffect(() => {
    // Sync state with URL search params when they change
    const searchParam = searchParams.get("search") || "";
    setSearch(searchParam);
  }, [searchParams]);

  return (
    <Input
      type="text"
      placeholder="Search Camping..."
      className="max-w-xs"
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
      }}
      value={search}
    />
  );
};

export default Search;
