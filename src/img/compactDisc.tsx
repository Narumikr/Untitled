import React from 'react'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiCode, ColorsSekaiKey } from '@/styles/sekai-colors'

export interface CompactDiscIconProps {
  className?: string
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
}

export const CompactDiscIcon = ({ className = '', sekai, themeMode }: CompactDiscIconProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai: sekai, mode: themeMode })
  const color = isLight ? '#121212' : '#ffffff'
  const reverseColor = isLight ? '#ffffff' : '#121212'

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48.3" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="46.7" fill={reverseColor} strokeWidth="3" />
      <circle cx="50" cy="50" r="43" fill={color} />

      {/* Glossy part of CD */}
      <path d="M50,50 L63.3,11.7 A43,43 0 0,1 90,41.7 Z" fill={reverseColor} opacity="0.3" />
      <path d="M50,50 L88.3,33.3 A43,43 0 0,1 90,36.7 Z" fill={color} />
      <path d="M50,50 L36.7,88.3 A43,43 0 0,1 10,58.3 Z" fill={reverseColor} opacity="0.2" />
      <path d="M50,50 L11.7,66.7 A43,43 0 0,1 10,63.3 Z" fill={color} />
      <circle cx="50" cy="50" r="10" fill={color} />

      <circle cx="50" cy="50" r="6.7" fill={reverseColor} />
      <circle cx="50" cy="50" r="4" fill={color} />

      <EighthNote sekaiColor={sekaiColor} colorTheme={color} />
    </svg>
  )
}

interface EighthNoteProps {
  sekaiColor: ColorsSekaiCode
  colorTheme: string
}

const EighthNote = ({ sekaiColor, colorTheme }: EighthNoteProps) => {
  return (
    <g transform="translate(63, 63)">
      <ellipse cx="0" cy="23" rx="17.6" ry="13.2" fill={colorTheme} />
      <rect x="6" y="-17.2" width="10.4" height="45" fill={colorTheme} />
      <path d="M6,-26.8 Q38.4,-17.1 35.6, 2 Q14.4,-11.5 6,4.5 Z" fill={colorTheme} />

      <ellipse cx="0" cy="23" rx="16" ry="11.6" fill={sekaiColor} />
      <rect x="7.3" y="-17.2" width="7.2" height="45" fill={sekaiColor} />
      <path d="M7.3,-24.8 Q36,-15.5 34, 0 Q18.4,-10 7.3,-3.1 Z" fill={sekaiColor} />
    </g>
  )
}
