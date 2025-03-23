import { useMemo, useState } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { ChevronDown } from "lucide-react";
import { timePeriodOptions } from "./values";

interface TagProps<T extends string> {
  value: T;
  removeSelectedValue: (value: T) => void;
}

export const Tag = <T extends string>({
  value,
  removeSelectedValue,
}: TagProps<T>) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(
    null
  );

  const memoizedTimePeriod = useMemo(
    () => selectedTimePeriod,
    [selectedTimePeriod]
  );

  const handleTimePeriodSelect = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
    setOpenDropdown(false);
  };

  return (
    <span className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2 text-sm px-4 py-[4px] border border-gray-500 rounded-sm">
      {value}

      <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
        <PopoverAnchor asChild>
          <button
            type="button"
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverAnchor>

        <PopoverContent
          side="bottom"
          align="start"
          className="w-32 p-0 bg-white border border-gray-300 rounded-md shadow-md"
        >
          <Command>
            <CommandList>
              {timePeriodOptions.map((timePeriod) => (
                <CommandItem
                  key={timePeriod}
                  onSelect={() => handleTimePeriodSelect(timePeriod)}
                  className="px-2 py-1 hover:bg-gray-200"
                >
                  {timePeriod}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <button
        type="button"
        onClick={() => removeSelectedValue(value)}
        className="text-sm text-red-500 ml-2"
      >
        ×
      </button>
      {selectedTimePeriod && (
        <span className="text-xs text-gray-500 ml-2">
          ({memoizedTimePeriod})
        </span>
      )}
    </span>
  );
};
