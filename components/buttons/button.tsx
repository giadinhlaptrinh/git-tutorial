import React from "react";
import { mergeClasses } from "../../libs/merge-classes";
import { GdSizes, GdVariants } from "../../types";

type GdButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: GdVariants;
  size?: GdSizes;
  wide?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export const GdButton = ({
  children,
  className,
  variant = "primary",
  size = "base",
  wide = false,
}: GdButtonProps) => {
  const classNames = mergeClasses(
    "relative rounded border font-semibold",
    "focusable transition duration-300 motion-reduce:transition-none",
    {
      "border-transparent bg-primary-500 text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2":
        variant === "primary",
      "border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2":
        variant === "secondary",
    },
    {
      "px-6 py-2 text-base": size === "sm",
      "px-8 py-3 text-base font-medium": size === "base",
      "px-10 py-3 text-lg": size === "lg",
      "px-16": size === "base" && wide,
    },
    className
  );

  return (
    <button type="button" className={classNames}>
      {children}
    </button>
  );
};
