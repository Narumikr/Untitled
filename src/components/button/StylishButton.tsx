import React from 'react'

import clsx from 'clsx'

import { ArrowSvg } from '@/img/arrow'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './StylishButton.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface StylishButtonProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLButtonElement>
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  arrowIcon?: boolean
}

export const StylishButton = ({
  sekai,
  themeMode,
  children,
  disabled = false,
  arrowIcon = true,
  ...rest
}: StylishButtonProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.3 : 0.5)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  return (
    <button
      {...rest}
      ref={rest.ref}
      type="button"
      className={clsx(styles[`sekai-stylish-button-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      disabled={disabled}>
      <div className={styles['sekai-stylish-button-decoration']} />
      {children}
      {arrowIcon ? (
        <ArrowSvg className={styles['sekai-stylish-arrow-icon']} vector="right" />
      ) : null}
    </button>
  )
}
