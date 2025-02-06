"use client";

import { FC, ReactNode } from "react";

interface ScanButtonProps {
  /** The label (e.g., "ID", "Insurance") */
  label: string;
  /** Whether the item has already been scanned */
  isScanned?: boolean;
  /** Click handler when user taps the button */
  onClick: () => void;
  /** Optional icon or React element shown above the label */
  icon?: ReactNode;
  /** Extra classes for the outer container, if needed */
  className?: string;
}

export const ScanButton: FC<ScanButtonProps> = ({
  label,
  isScanned = false,
  onClick,
  icon,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-col items-center justify-center w-48 h-48 bg-gray-100 hover:bg-gray-300 rounded-md border ${className}`}
    >
      {/* Icon shown above the label, if provided */}
      {icon && <span className="text-gray-500 mb-2">{icon}</span>}

      {/* Label text changes depending on isScanned */}
      <span className="text-gray-500">
        {isScanned ? `${label} Scanned!` : `Scan ${label}`}
      </span>
    </div>
  );
};
