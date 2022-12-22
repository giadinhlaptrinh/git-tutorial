import React from "react";

type GdBadgeProps = {
  children: React.ReactNode;
};

export const GdBadge = ({ children }: GdBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-0.5 text-sm font-medium text-gray-50">
      {children}
    </span>
  );
};
