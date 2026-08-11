"use client";

import { useState } from "react";

interface StatusIndicatorProps {
  /** Whether the indicator starts active/on */
  isActive?: boolean;
  /** interactive = clickable toggle; static = display only */
  mode?: "static" | "interactive";
  /** Label shown next to the indicator */
  label?: string;
  /** Callback fired when toggled (interactive mode only) */
  onToggle?: (newState: boolean) => void;
  /** Extra class names for the wrapper */
  className?: string;
}

export default function StatusIndicator({
  isActive = true,
  mode = "static",
  label,
  onToggle,
  className = "",
}: StatusIndicatorProps) {
  const [active, setActive] = useState(isActive);

  const handleClick = () => {
    if (mode !== "interactive") return;
    const next = !active;
    setActive(next);
    onToggle?.(next);
  };

  const current = mode === "interactive" ? active : isActive;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={mode !== "interactive"}
      aria-label={label || (current ? "Active" : "Inactive")}
      className={`inline-flex items-center gap-2 ${
        mode === "interactive" ? "cursor-pointer select-none" : "cursor-default"
      } ${className}`}
    >
      {/* The LED dot */}
      <span
        className="relative flex items-center justify-center"
        style={{ width: 14, height: 14 }}
      >
        {/* Glow ring (active only) */}
        {current && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "rgba(34,197,94,0.3)",
              boxShadow: "0 0 8px 3px rgba(34,197,94,0.45)",
              borderRadius: "50%",
              transition: "opacity 250ms ease",
            }}
          />
        )}
        {/* Core dot */}
        <span
          className="relative rounded-full"
          style={{
            width: 10,
            height: 10,
            background: current ? "#22c55e" : "#9ca3af",
            boxShadow: current
              ? "0 0 6px 2px rgba(34,197,94,0.5)"
              : "none",
            transition: "background 250ms ease, box-shadow 250ms ease",
            display: "inline-block",
          }}
        />
      </span>

      {/* Optional label */}
      {label && (
        <span
          className="text-xs font-semibold"
          style={{
            color: current ? "#16a34a" : "#9ca3af",
            transition: "color 250ms ease",
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}
