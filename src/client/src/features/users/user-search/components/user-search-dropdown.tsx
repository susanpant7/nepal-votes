import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { useUserSearchQuery } from "@/features/users/user-search/api/user-search.query.ts";
import { useState } from "react";
import type { UserSearchResponse } from "@/features/users/user-search/types/user-search.types.ts";

interface UserSearchDropdownProps {
  onSelect: (user: UserSearchResponse) => void;
  currentUserName?: string | null;
  searchLabel?: string;
}

export function UserSearchDropdown({
  onSelect,
  currentUserName,
  searchLabel,
}: UserSearchDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(currentUserName ?? "");
  const [selectedUser, setSelectedUser] = useState<string | null>(
    currentUserName ?? null,
  );

  const debouncedQuery = useDebounce(searchValue, 300);
  const { data: users, isLoading } = useUserSearchQuery(debouncedQuery);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selectedUser ? selectedUser : searchLabel || "Search users..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        {" "}
        <Command shouldFilter={false}>
          {" "}
          {/* Important: Disable client-side filtering */}
          <CommandInput
            placeholder="Type name"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isLoading && users?.length === 0 && (
              <CommandEmpty>No users found.</CommandEmpty>
            )}

            <CommandGroup>
              {users?.map((user) => (
                <CommandItem
                  key={user.userId}
                  value={user.userId.toString()}
                  onSelect={() => {
                    setSelectedUser(user.fullName);
                    setOpen(false);
                    onSelect(user);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser === user.fullName
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{user.fullName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
