import React, { useMemo, useState } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { fireOnEnterKey } from '@/utils/operation'

import { colorsSekai } from '@/styles/sekai-colors'

import styles from './DoReMeetEffect.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface DoReMeetEffectProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekaiKeys: ColorsSekaiKey[]
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLSpanElement>
  text: string
  duration?: number
}

export const DoReMeetEffect = ({
  sekaiKeys,
  themeMode,
  text,
  duration = 250,
  ...rest
}: DoReMeetEffectProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  const INIT_VALUE = -1
  const [currentSekaiIndex, setCurrentSekaiIndex] = useState(INIT_VALUE)
  const [isPlaying, setIsPlaying] = useState(false)
  const optionStyle = useMemo(() => {
    if (currentSekaiIndex < 0) return {}

    return {
      '--sekai-color': colorsSekai[sekaiKeys[currentSekaiIndex]],
    }
  }, [currentSekaiIndex, sekaiKeys])

  const handleDeReMeetEffect = () => {
    if (isPlaying) return

    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentSekaiIndex((prev) => {
        if (prev + 1 >= sekaiKeys.length) {
          clearInterval(interval)
          setIsPlaying(false)
          return INIT_VALUE
        }
        return prev + 1
      })
    }, duration)
  }

  return (
    <span
      role="button"
      ref={rest.ref}
      tabIndex={-1}
      onClick={handleDeReMeetEffect}
      onKeyDown={fireOnEnterKey<HTMLSpanElement>(handleDeReMeetEffect)}
      {...rest}
      className={clsx(styles[`sekai-doremeet-effect-${modeTheme}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {text}
    </span>
  )
}
