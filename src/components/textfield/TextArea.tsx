import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import { AnnotationText } from '../text/UtilText'

import styles from './TextArea.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

type ResizeVariant = 'none' | 'both' | 'horizontal' | 'vertical'

export interface TextAreaProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  resize?: ResizeVariant
}

export const TextArea = ({
  sekai,
  themeMode,
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  resize = 'none',
  ...rest
}: TextAreaProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
    onChange?.(newValue)
  }

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(styles['sekai-textarea-wrap'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <textarea
        id={`${rest.id}-textarea`}
        className={clsx(styles['sekai-textarea'], styles[`sekai-textarea-${modeTheme}`])}
        style={{ resize }}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputValue}
        maxLength={maxLength}
      />
      <TextCounter value={value || ''} maxLength={maxLength} />
    </div>
  )
}

interface TextCounterProps {
  value: string
  maxLength?: number
}
const TextCounter = ({ value, maxLength }: TextCounterProps) => {
  if (!Boolean(maxLength)) return null
  return (
    <AnnotationText
      className={clsx(
        styles['sekai-text-counter'],
      )}>{`${value.length}/${maxLength}`}</AnnotationText>
  )
}
