import React from 'react'

export default function IndianFlag({ className, width = 32, height = 24 }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="8" y="0" fill="#FF9933" />
      <rect width="36" height="8" y="8" fill="#FFFFFF" />
      <rect width="36" height="8" y="16" fill="#138808" />
      <circle cx="18" cy="12" r="3.5" fill="#000080" />
      <circle cx="18" cy="12" r="2.8" fill="#FFFFFF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 18 + 2.5 * Math.cos(angle)
        const y1 = 12 + 2.5 * Math.sin(angle)
        const x2 = 18 + 3.2 * Math.cos(angle)
        const y2 = 12 + 3.2 * Math.sin(angle)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="0.4"
          />
        )
      })}
    </svg>
  )
}
