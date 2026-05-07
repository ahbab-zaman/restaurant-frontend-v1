import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#5d4330] data-[state=unchecked]:bg-[#cfc2b3]",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        default: "h-5 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & VariantProps<typeof switchVariants>;

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked = false,
      onCheckedChange,
      disabled,
      onClick,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={(event) => {
          if (!disabled) onCheckedChange?.(!checked);
          onClick?.(event);
        }}
        className={cn(switchVariants({ size }), className)}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={cn(
            "pointer-events-none block rounded-full shadow-sm transition-transform duration-200",
            "data-[state=checked]:bg-white data-[state=unchecked]:bg-white", // ← always white
            size === "sm"
              ? "h-3 w-3 data-[state=checked]:translate-x-3"
              : "h-4 w-4 data-[state=checked]:translate-x-4",
            "data-[state=unchecked]:translate-x-0",
          )}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
