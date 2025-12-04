import React from 'react'

import clsx from 'clsx'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import styles from './Chip.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface ChipProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  label: string
  onClick?: () => void
  onDelete?: () => void
  size?: 'small' | 'medium' | 'large'
  variant?: 'filled' | 'outlined'
}

export const Chip = ({
  sekai,
  themeMode,
  label,
  onClick,
  onDelete,
  size = 'medium',
  variant = 'filled',
  ...rest
}: ChipProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiBgColor = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-bg-color': sekaiBgColor,
  }

  return (
    <div
      role="button"
      tabIndex={0}
      {...rest}
      className={clsx(
        styles[`sekai-chip-${size}`],
        styles[`sekai-chip-${variant}`],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      onClick={onClick}>
      <span className={clsx(styles['sekai-chip-label'])}>{label}</span>
      <DeleteIconButton sekai={sekai} themeMode={themeMode} size={size} onDelete={onDelete} />
    </div>
  )
}

interface DeleteIconButtonProps {
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  size: 'small' | 'medium' | 'large'
  onDelete?: () => void
}
const DeleteIconButton = ({ sekai, themeMode, size, onDelete }: DeleteIconButtonProps) => {
  if (!onDelete) return null
  return (
    <button
      className={clsx(styles['sekai-chip-delete-btn'], styles[`sekai-chip-delete-btn-${size}`])}
      onClick={onDelete}
      aria-label="delete">
      <ClearSvg sekai={sekai} themeMode={themeMode} />
    </button>
  )
}
