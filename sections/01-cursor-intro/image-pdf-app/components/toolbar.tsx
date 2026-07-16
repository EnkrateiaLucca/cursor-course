"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ZOOM_LEVELS } from "@/lib/constants";
import type { EditorAction, EditorState } from "@/types/editor";

type ToolbarProps = {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  hasContent: boolean;
  onAddImages: (files: FileList | File[]) => void;
};

export function Toolbar({ state, dispatch, hasContent, onAddImages }: ToolbarProps) {
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="toolbar sticky top-0 z-50 flex flex-wrap items-center gap-3 bg-slate-800 px-5 py-3 text-slate-100 shadow-md print:hidden">
      <h1 className="mr-2 text-sm font-semibold">Image PDF Layout</h1>

      <Label className="text-slate-200">
        Page
        <Select
          value={state.pageSize}
          onValueChange={(value) =>
            dispatch({ type: "SET_PAGE_SIZE", pageSize: value as "A4" | "Letter" })
          }
        >
          <SelectTrigger className="ml-2 h-8 w-24 border-slate-600 bg-slate-900 text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A4">A4</SelectItem>
            <SelectItem value="Letter">Letter</SelectItem>
          </SelectContent>
        </Select>
      </Label>

      <Label className="text-slate-200">
        <Checkbox
          checked={state.showGuides}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_SHOW_GUIDES", showGuides: checked === true })
          }
        />
        Margin guides
      </Label>

      <Label className="text-slate-200">
        <Checkbox
          checked={state.snapToGrid}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_SNAP_TO_GRID", snapToGrid: checked === true })
          }
        />
        Snap to grid
      </Label>

      <div className="h-6 w-px bg-slate-600" />

      <Button
        variant="secondary"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        Add images
      </Button>
      <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "ADD_PAGE" })}>
        + Page
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={!hasContent}
        onClick={() => dispatch({ type: "AUTO_ARRANGE" })}
      >
        Auto-arrange
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={!state.selection}
        onClick={() => dispatch({ type: "DELETE_SELECTED" })}
      >
        Delete selected
      </Button>

      <div className="h-6 w-px bg-slate-600" />

      <Label className="text-slate-200">
        Zoom
        <Select
          value={String(state.zoom)}
          onValueChange={(value) => dispatch({ type: "SET_ZOOM", zoom: Number(value) })}
        >
          <SelectTrigger className="ml-2 h-8 w-20 border-slate-600 bg-slate-900 text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ZOOM_LEVELS.map((level) => (
              <SelectItem key={level} value={String(level)}>
                {Math.round(level * 100)}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Button disabled={!hasContent} size="sm" onClick={() => window.print()}>
        Save PDF
      </Button>
      <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "CLEAR_ALL" })}>
        Clear all
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="relative"
        aria-label="Toggle theme"
        disabled={!mounted}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted ? (
          <>
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </>
        ) : (
          <Sun className="size-4" />
        )}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) onAddImages(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
