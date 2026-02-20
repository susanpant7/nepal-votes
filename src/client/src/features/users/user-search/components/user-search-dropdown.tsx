import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { useState, useEffect } from "react";
import type { UserSearchResponse } from "@/features/users/user-search/types/user-search.types.ts";

interface UserSearchDropdownProps {
  onSelect: (user: UserSearchResponse | null) => void;
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

  useEffect(() => {
    setSelectedUser(currentUserName ?? null);
    setSearchValue(currentUserName ?? "");
  }, [currentUserName]);

  const debouncedQuery = useDebounce(searchValue, 300);
  const { data: users, isLoading } = useUserSearchQuery(debouncedQuery);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between flex items-center border rounded-md px-3 py-2 text-sm bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <span className="truncate">
            {selectedUser ? selectedUser : searchLabel || "Search users..."}
          </span>
          <div className="flex items-center gap-1">
            {selectedUser && (
              <div
                role="button"
                className="p-1 hover:bg-muted rounded-full transition-colors relative z-20 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSelectedUser(null);
                  setSearchValue("");
                  onSelect(null);
                }}
              >
                <X className="h-3 w-3 shrink-0 opacity-50 hover:opacity-100" />
              </div>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
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
