"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { labelVariants } from "@/components/ui/Label";
import { secondsFromMinutes } from "@/lib/time";
import { cn } from "@/lib/utils";

interface MinutesSecondsInputGroupProps {
  label: string;
  minutes: number | undefined;
  setMinutes: (mins: number | undefined) => void;
  seconds: number | undefined;
  setSeconds: (secs: number | undefined) => void;
}

export const MinutesSecondsInputGroup: React.FC<
  MinutesSecondsInputGroupProps
> = ({ label, minutes, setMinutes, seconds, setSeconds }) => {
  return (
    <fieldset>
      <legend className={cn(labelVariants(), "mb-2")}>{label}</legend>
      <div className="flex items-center">
        <Input
          placeholder="Mins"
          aria-label={`${label} (Minutes)`}
          type="number"
          min={0}
          value={minutes?.toString() ?? ""}
          onChange={(e) => {
            const valStr = e.target.value;
            setMinutes(valStr ? Number(valStr) : undefined);
          }}
        />
        <span className="mx-1.5">:</span>
        <Input
          placeholder="Secs"
          aria-label={`${label} (Seconds)`}
          type="number"
          min={0}
          value={seconds?.toString() ?? ""}
          onChange={(e) => {
            const valStr = e.target.value;
            setSeconds(valStr ? Number(valStr) : undefined);
          }}
        />
      </div>
    </fieldset>
  );
};

interface UseMinutesSecondsResult
  extends Omit<MinutesSecondsInputGroupProps, "label"> {
  /**
   * The total number of seconds. For example, if `minutes` is 1 and `seconds`
   * is 30, then `totalSeconds` will be 90.
   */
  totalSeconds: number | undefined;
}

export const useMinutesSeconds = (): UseMinutesSecondsResult => {
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  return {
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    totalSeconds: getTotalSeconds({ minutes, seconds }),
  };
};

function getTotalSeconds({
  minutes,
  seconds,
}: {
  minutes: number | undefined;
  seconds: number | undefined;
}): number | undefined {
  if (minutes == undefined) {
    return seconds == undefined ? undefined : seconds;
  }

  return secondsFromMinutes(minutes) + (seconds ?? 0);
}
