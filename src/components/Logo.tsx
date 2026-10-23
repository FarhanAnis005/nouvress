import React from 'react'

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  variant?: 'mark' | 'badge'
  className?: string
  style?: React.CSSProperties
}

/**
 * NOUVRES Broadsheet Editorial Lettermark "N"
 *
 * Variants:
 * - 'badge': High-contrast black newsprint block with double architectural hairline borders and crisp white "N"
 * - 'mark': Pure standalone vector glyph using currentColor (inherits text color)
 */
export const Logo: React.FC<LogoProps> = ({
  size = 40,
  variant = 'mark',
  className = '',
  style,
  ...rest
}) => {
  const glyph = (
    <g>
      {/* Left Vertical Stem Body */}
      <rect x="136" y="116" width="36" height="280" />
      {/* Left Top Serif Bracket */}
      <path d="M 90 116 H 136 V 154 C 136 132, 118 116, 90 116 Z" />
      {/* Left Bottom-Left Serif Bracket */}
      <path d="M 90 396 H 136 V 358 C 136 380, 118 396, 90 396 Z" />
      {/* Left Bottom-Right Serif Bracket */}
      <path d="M 172 396 H 214 C 186 396, 172 380, 172 358 Z" />

      {/* Main Bold Broadsheet Diagonal */}
      <polygon points="136,116 228,116 386,396 294,396" />

      {/* Right Vertical Stem Body */}
      <rect x="362" y="116" width="24" height="280" />
      {/* Right Top-Left Serif Bracket */}
      <path d="M 324 116 H 362 V 154 C 362 132, 352 116, 324 116 Z" />
      {/* Right Top-Right Serif Bracket */}
      <path d="M 386 116 H 422 C 396 116, 386 132, 386 154 Z" />
      {/* Right Bottom-Right Serif Bracket */}
      <path d="M 386 396 H 422 C 396 396, 386 380, 386 358 Z" />
    </g>
  )

  if (variant === 'badge') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className={`nouvres-logo nouvres-logo-badge ${className}`}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        aria-label="NOUVRES"
        role="img"
        {...rest}
      >
        <rect width="512" height="512" fill="#111111" rx="64" />
        <rect
          x="26"
          y="26"
          width="460"
          height="460"
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="2"
          rx="44"
        />
        <rect
          x="34"
          y="34"
          width="444"
          height="444"
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1"
          rx="38"
        />
        <g fill="#ffffff">{glyph}</g>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      className={`nouvres-logo nouvres-logo-mark ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="NOUVRES"
      role="img"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
