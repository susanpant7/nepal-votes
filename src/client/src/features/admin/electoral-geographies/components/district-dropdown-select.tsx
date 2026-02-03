import * as React from "react";
import { ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import type { DistrictDropdown } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";

interface DistrictDropdownProps {
  onSelect: (district: DistrictDropdown) => void;
  disabled?: boolean;
  onAddDistrict?: (name: string) => void;
  defaultDistrictId?: number | null;
}

export const DistrictDropdownSelect = ({
  onSelect,
  disabled = false,
  onAddDistrict,
  defaultDistrictId,
}: DistrictDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState<DistrictDropdown | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data = [], isLoading } =
    useAdminElectoralGeographyQuery.getDistricts();

  useEffect(() => {
    if (defaultDistrictId && data.length > 0) {
      const found = data.find((d) => d.districtId === defaultDistrictId);
      if (found) {
        setSelected(found);
      }
    } else if (!defaultDistrictId) {
      setSelected(null);
    }
  }, [defaultDistrictId, data]);

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
            selected.districtName
          ) : (
            "Select district"
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
            placeholder="Search district..."
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
                  {onAddDistrict ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-none font-normal text-primary hover:text-primary"
                      onClick={() => {
                        onAddDistrict?.(searchQuery);
                        setOpen(false);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{searchQuery}"
                    </Button>
                  ) : (
                    <div className="py-6 text-center text-sm">
                      No district found.
                    </div>
                  )}
                </CommandEmpty>

                <CommandGroup className="max-h-64 overflow-auto">
                  {data.map((district) => (
                    <CommandItem
                      key={district.districtId}
                      value={district.districtName}
                      onSelect={() => {
                        setSelected(district);
                        onSelect(district);
                        setOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      {district.districtName}
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
};
