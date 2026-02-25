
import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            handleUnselect(selected[selected.length - 1]);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected],
  );

  const selectables = options.filter(
    (option) => !selected.includes(option.value),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className={`group border border-input px-3 py-2 text-sm ring-offset-background rounded-md ${!disabled && "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"}`}>
        <div className="flex gap-1 flex-wrap">
          {selected.map((val) => {
            const option = options.find((o) => o.value === val);
            // Verify option exists, if not finding it, perhaps handle gracefully or show value
            const label = option?.label || val;
            return (
              <Badge key={val} variant="secondary">
                {label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed"
                  disabled={disabled}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(val);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(val)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Input be too small */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => !disabled && setOpen(true)}
            placeholder={disabled ? "" : placeholder}
            disabled={disabled}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-[50px] disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-60">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    onChange([...selected, option.value]);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
