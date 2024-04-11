import { cn } from "@/lib/utils";

export const H1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1 className={cn("text-3xl font-semibold", className)}>{children}</h1>
  );
};
