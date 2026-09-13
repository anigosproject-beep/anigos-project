"use client"

import { useId } from "react"

import { cn } from "cn"

type DistributionLinePatternProps = {
  className?: string
}

export function DistributionLinePattern({
  className,
}: DistributionLinePatternProps) {
  const patternId = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-[0.14]",
        className
      )}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width="112"
          height="112"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <path
            d="M0 28H112M28 0V112M84 0V112"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M28 28H84V84H28z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="28" cy="28" r="3" fill="currentColor" />
          <circle cx="84" cy="84" r="3" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
