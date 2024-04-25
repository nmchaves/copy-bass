import { cn } from "@/lib/utils";

export function LeftyGuitarEmoji({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn("inline-block", className)}
      style={{ transform: "rotateY(180deg)", ...style }}
    >
      🎸
    </span>
  );
}
