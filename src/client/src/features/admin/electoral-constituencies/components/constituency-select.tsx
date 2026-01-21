import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
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
import type { ConstituencyInfo } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

interface ConstituencySelectProps {
  value?: number;
  onChange: (constituency: ConstituencyInfo) => void;
}

export function ConstituencySelect({
  value,
  onChange,
}: ConstituencySelectProps) {
  const [open, setOpen] = React.useState(false);

  const { data = [], isLoading } =
    useAdminConstituencyQuery.getConstituencies();

  const selected = data.find((c) => c.constituencyId === value);

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

      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandInput
            placeholder="Search constituency..."
            disabled={isLoading}
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : (
            <>
              <CommandEmpty>No constituency found.</CommandEmpty>

              <CommandGroup className="max-h-64 overflow-auto">
                {data.map((constituency) => (
                  <CommandItem
                    key={constituency.constituencyId}
                    value={constituency.constituencyName}
                    onSelect={() => {
                      onChange(constituency);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === constituency.constituencyId
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
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
