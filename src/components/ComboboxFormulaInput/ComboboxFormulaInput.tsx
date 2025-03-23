import { Command as CommandPrimitive } from "cmdk";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { FormulaOption } from "@/types/formula";
import { FormulaOutput } from "../FormulaOutput/FormulaOutput";

interface FormulaInputProps<T extends string> {
  selectedValues: T[];
  onSelectedValuesChange: (values: T[]) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: FormulaOption[];
  isLoading: boolean;
  emptyMessage?: string;
  placeholder?: string;
}

export const FormulaInput = <T extends string>({
  selectedValues,
  onSelectedValuesChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
}: FormulaInputProps<T>) => {
  const [open, setOpen] = useState(false);

  const onSelectItem = (inputValue: string) => {
    onSelectedValuesChange([...selectedValues, inputValue as T]);
    setOpen(false);
    handleOnValueChange("");
  };

  const handleOnValueChange = (val: string) => {
    onSearchValueChange(val);
  };

  const removeSelectedValue = (value: T) => {
    onSelectedValuesChange(selectedValues.filter((item) => item !== value));
  };

  return (
    <div className="flex items-center flex-wrap gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={handleOnValueChange}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="w-[300px] p-4 mt-4"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1"></div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map(({ value, label }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      {label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandEmpty className="text-center">
                  {emptyMessage ?? "No items."}
                </CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>

      <FormulaOutput
        selectedValues={selectedValues}
        removeSelectedValue={removeSelectedValue}
      />
    </div>
  );
};
