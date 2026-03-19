"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface SelectControlsProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function SelectControls({
  totalCount,
  selectedCount,
  onSelectAll,
  onDeselectAll,
}: SelectControlsProps) {
  const allSelected = selectedCount === totalCount;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={() => (allSelected ? onDeselectAll() : onSelectAll())}
        />
        <span className="text-sm font-medium">
          {allSelected ? "Deselect All" : "Select All"}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">
        {selectedCount} of {totalCount} selected
      </span>
    </div>
  );
}
