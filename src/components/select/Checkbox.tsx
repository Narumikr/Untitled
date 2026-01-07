import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './Checkbox.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type CheckboxProps = {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLInputElement>
  checked?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
  filling?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'disabled'>

export const Checkbox = ({
  sekai,
  themeMode,
  checked,
  disabled,
  onChange,
  filling,
  ...rest
}: CheckboxProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.3 : 0.4)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <label
      className={clsx(styles['sekai-checkbox'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <input
        {...rest}
        ref={rest.ref}
        tabIndex={Boolean(disabled) ? -1 : 0}
        type="checkbox"
        className={clsx(styles[`sekai-checkbox-${modeTheme}`], {
          [styles['sekai-checkbox-filling']]: filling,
        })}
        checked={Boolean(checked)}
        aria-checked={Boolean(checked)}
        disabled={Boolean(disabled)}
        onChange={handleChange}
      />
    </label>
  )
}
