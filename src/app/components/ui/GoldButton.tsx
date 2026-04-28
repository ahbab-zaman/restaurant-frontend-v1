"use client";

import { cn } from "@/app/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, className, variant = "filled", size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: "px-6 py-2 text-[10px]",
      md: "px-8 py-3 text-[11px]",
      lg: "px-12 py-4 text-[11px]",
    };

    if (variant === "outline") {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center tracking-[0.22em] uppercase font-body font-medium",
            "transition-all duration-150",
            "cursor-pointer select-none",
            sizeStyles[size],
            className,
          )}
          style={{
            border: "0.5px solid var(--color-brand-secondary)",
            color: "var(--color-brand-secondary)",
            background: "transparent",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--color-brand-secondary)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-brand-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-brand-secondary)";
          }}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center tracking-[0.22em] uppercase font-body font-medium",
          "transition-all duration-150",
          "cursor-pointer select-none",
          sizeStyles[size],
          className,
        )}
        style={{
          background: "var(--color-btn-primary-bg)",
          color: "var(--color-btn-primary-text)",
          fontFamily: "var(--font-body)",
          border: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--color-btn-primary-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--color-btn-primary-bg)";
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GoldButton.displayName = "GoldButton";
