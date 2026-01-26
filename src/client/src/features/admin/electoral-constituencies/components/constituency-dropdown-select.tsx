import * as React from "react";
import { ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";

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
  CommandList,
} from "@/components/ui/command";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import type { ConstituencyDropdown } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

interface ConstituencyDropdownProps {
  onChange: (constituency: ConstituencyDropdown) => void;
  disabled?: boolean; // Removed the redundant | false
  onAddConstituency?: (name: string) => void;
}

export function ConstituencyDropdownSelect({
  onChange,
  disabled = false, // Defaulting to false so it's enabled by default
  onAddConstituency,
}: ConstituencyDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState<ConstituencyDropdown | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data = [], isLoading } =
    useAdminConstituencyQuery.getConstituenciesDropdown();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={isLoading || disabled}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : selected ? (
            selected.constituencyName
          ) : (
            "Select constituency"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 shadow-lg border w-(--radix-popover-trigger-width)"
      >
        <Command>
          <CommandInput
            placeholder="Search constituency..."
            disabled={isLoading}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {/* Conditional Rendering: Only show the "Add" button if the prop is provided */}
                  {onAddConstituency ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-none font-normal text-primary hover:text-primary"
                      onClick={() => {
                        onAddConstituency?.(searchQuery);
                        setOpen(false);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{searchQuery}"
                    </Button>
                  ) : (
                    <div className="py-6 text-center text-sm">
                      No constituency found.
                    </div>
                  )}
                </CommandEmpty>

                <CommandGroup className="max-h-64 overflow-auto">
                  {data.map((constituency) => (
                    <CommandItem
                      key={constituency.constituencyId}
                      value={constituency.constituencyName}
                      onSelect={() => {
                        setSelected(constituency);
                        onChange(constituency);
                        setOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      {constituency.constituencyName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
