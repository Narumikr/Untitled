import React, { useState } from 'react'

import clsx from 'clsx'

import { AnnotationText } from '@/components/text/UtilText'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './TextField.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  placeholder?: string
  clearButton?: boolean
  onChangeInput?: (value: string) => void
  isError?: boolean
  errorMessage?: string
  maxLength?: number
}

export const TextField = ({
  id,
  className,
  style,
  sekai,
  themeMode,
  ref,
  clearButton = true,
  onChangeInput,
  isError = false,
  errorMessage,
  ...inputProps
}: TextFieldProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const [inputValue, setInputValue] = useState('')

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChangeInput?.(value)
  }

  const handleClearInput = () => {
    setInputValue('')
    onChangeInput?.('')
  }

  return (
    <div
      id={id}
      ref={ref}
      className={clsx(styles['sekai-textfield'], className)}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      <div className={clsx(styles['sekai-textfield-wrapper'])}>
        <input
          id={`${id}-input`}
          type="text"
          {...inputProps}
          className={clsx(styles[`sekai-textfield-input-${modeTheme}`], {
            [styles['sekai-textfield-clear']]: clearButton,
          })}
          value={inputValue}
          onChange={handleInputChange}
        />
        {/* clear button */}
        {clearButton && inputValue.length ? (
          <button
            className={clsx(styles['sekai-textfield-clear-button'])}
            onClick={handleClearInput}>
            <ClearSvg
              className={clsx(styles['sekai-textfield-clear-icon'])}
              sekai={sekai}
              themeMode={themeMode}
            />
          </button>
        ) : null}
      </div>
      {isError ? (
        <AnnotationText className={clsx(styles['sekai-textfield-input-error'])}>
          {errorMessage}
        </AnnotationText>
      ) : null}
    </div>
  )
}
