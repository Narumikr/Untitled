import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import { colorsSekai } from '@/styles/sekai-colors'

import styles from './Divider.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

const DEFAULT_LINE_HEIGHT = '2px'

export interface DividerProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  children?: React.ReactNode
  pairColor?: ColorsSekaiKey
  lineHeight?: number | string
  variant?: 'fullWidth' | 'inset' | 'middle'
  textAlign?: 'left' | 'center' | 'right'
  shadow?: boolean
}

export const Divider = ({
  sekai,
  themeMode,
  children,
  pairColor,
  lineHeight,
  variant = 'fullWidth',
  textAlign = 'center',
  shadow,
  ...rest
}: DividerProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const gradientColor = pairColor ? colorsSekai[pairColor] : 'transparent'
  const shadowStyle = Boolean(shadow) ? styles[`sekai-divider-shadow-${modeTheme}`] : ''

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-pair-color': gradientColor,
    '--divider-line-height': getLineHeightStyle(lineHeight),
  }

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(styles[`sekai-divider-${variant}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {children ? (
        <div
          role="separator"
          aria-orientation="horizontal"
          className={clsx(styles[`sekai-divider-with-item-${textAlign}`], shadowStyle)}>
          {children}
        </div>
      ) : (
        <hr
          role="separator"
          aria-orientation="horizontal"
          className={clsx(styles['sekai-divider-line'], shadowStyle)}
        />
      )}
    </div>
  )
}

const getLineHeightStyle = (lineHeight?: number | string): string => {
  if (typeof lineHeight === 'number' && lineHeight >= 0) return `${lineHeight}px`
  if (typeof lineHeight === 'string') return lineHeight
  return DEFAULT_LINE_HEIGHT
}
