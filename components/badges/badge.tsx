import React from "react";

type GdBadgeProps = {
  children: React.ReactNode;
};

export const GdBadge = ({ children }: GdBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-700 px-3 py-0.5 text-sm font-medium text-indigo-50">
      {children}
    </span>
  );
};
