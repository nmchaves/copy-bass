import { cn } from "@/lib/utils";
import { H1 } from "./Heading";

export const PageHeading = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <H1 className={cn("text-center text-cyan-700", className)}>{children}</H1>
  );
};
