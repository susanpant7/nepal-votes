import * as React from "react";
import { ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import type { ConstituencyDropdown } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

interface ConstituencyDropdownProps {
  onChange: (constituency: ConstituencyDropdown) => void;
}

export function ConstituencyDropdownSelect({
  onChange,
}: ConstituencyDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<ConstituencyDropdown | null>(
    null,
  );

  const { data = [], isLoading } =
    useAdminConstituencyQuery.getConstituenciesDropdown();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading constituencies…
            </span>
          ) : selected ? (
            selected.constituencyName
          ) : (
            "Select constituency"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg border dark:border-gray-700">
        <Command>
          <CommandInput
            placeholder="Search constituency..."
            disabled={isLoading}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : (
            <>
              <CommandEmpty className="text-gray-500 dark:text-gray-400">
                No constituency found.
              </CommandEmpty>

              <CommandGroup className="max-h-64 overflow-auto">
                {data.map((constituency) => (
                  <CommandItem
                    key={constituency.constituencyId}
                    value={constituency.constituencyName}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    onSelect={() => {
                      setSelected(constituency); // store selected value
                      onChange(constituency); // notify parent
                      setOpen(false); // close dropdown
                    }}
                  >
                    {constituency.constituencyName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
