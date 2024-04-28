import { cn } from "@/lib/utils";
import type {
  NullableFretNumber,
  TabColumn,
  TabNotes,
} from "@/server/tabs/tabMaker";

// TODO: Add another prop to handle non-standard tunings, e.g. Drop D.
export interface BassTabsProps {
  tabs: TabNotes;
  className?: string;
}

// Note: Adding `overflow-x-scroll` to both the root element and the wrapper
// around the notes ensures that the bass string labels remain fixed at the left,
// while the notes can scroll.
export function BassTabs({ tabs, className }: BassTabsProps) {
  return (
    <div className={cn("flex items-center overflow-x-scroll", className)}>
      <div>
        <StringLabel label="G" />
        <StringLabel label="D" />
        <StringLabel label="A" />
        <StringLabel label="E" />
      </div>
      <div className="flex items-center overflow-x-scroll">
        {tabs.map((column, idx) => (
          <TabColumn key={idx} column={column} />
        ))}
      </div>
    </div>
  );
}

function TabColumn({ column }: { column: TabColumn }) {
  return (
    <div>
      <Note fretNumber={column[0]} />
      <Note fretNumber={column[1]} />
      <Note fretNumber={column[2]} />
      <Note fretNumber={column[3]} />
    </div>
  );
}

function StringLabel({ label }: { label: string | null }) {
  return (
    <div
      className="py-0.5 pr-3 mr-2 border-r-2 border-slate-950 font-bold text-center"
      aria-label={`${label} string`}
    >
      {label}
    </div>
  );
}

// Use the en dash for blank values, i.e. no note.
// It's not that en dash is the "right" type of dash to use semantically for
// this. And dash is fine. But in practice, the en dash looks best for this.
const EN_DASH = "–";

function Note({ fretNumber }: { fretNumber: NullableFretNumber }) {
  return (
    <div
      className="py-0.5 px-0 w-6 tabular-nums font-semibold text-center"
      aria-label={fretNumber != null ? `Fret ${fretNumber}` : "No fret"}
    >
      {fretNumber ?? EN_DASH}
    </div>
  );
}
