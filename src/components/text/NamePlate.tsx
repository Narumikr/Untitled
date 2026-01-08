import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './NamePlate.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface NamePlateProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  text: string
  colorCount?: number
}

export const NamePlate = ({
  sekai,
  themeMode,
  text,
  colorCount = 1,
  ...rest
}: NamePlateProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const colorText = text.slice(0, colorCount)
  const normalText = text.slice(colorCount)

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(styles[`sekai-name-plate-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <span className={styles['sekai-name-plate-color']}>{colorText}</span>
      <span>{normalText}</span>
    </div>
  )
}
