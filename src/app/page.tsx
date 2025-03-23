"use client";

import { FormulaInput } from "@/components/ComboboxFormulaInput/ComboboxFormulaInput";
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";

export function extractExchange(input: string): string {
  return input.replace(/[^a-zA-Z]/g, "");
}

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const { data, isLoading } = useSearch(searchValue);

  return (
    <div className="container px-32 py-16">
      <h1 className="font-light text-3xl mb-4">Formula input implementation</h1>
      <FormulaInput
        selectedValues={selectedValue}
        onSelectedValuesChange={setSelectedValue}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data ?? []}
        isLoading={isLoading}
        emptyMessage="No option found"
      />
    </div>
  );
}
