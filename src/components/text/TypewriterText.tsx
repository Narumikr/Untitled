import React, { useEffect, useMemo, useState } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './TypewriterText.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface TypewriterTextOptions {
  speed?: number
  loop?: boolean
  cursor?: boolean
}
const defaultOptions: TypewriterTextOptions = {
  speed: 100,
  loop: false,
  cursor: true,
}

export interface TypewriterTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  text: string
  options?: TypewriterTextOptions
}

export const TypewriterText = ({
  sekai,
  themeMode,
  text,
  options = defaultOptions,
  ...rest
}: TypewriterTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai, mode: themeMode })
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const viewCursor = useMemo(() => {
    return options.cursor && displayText.length < text.length
  }, [displayText, text, options.cursor])

  useEffect(() => {
    setDisplayText('')
    const typewriteInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= text.length - 1) {
          if (options.loop) {
            setDisplayText('')
            return 0
          } else {
            clearInterval(typewriteInterval)
            return prevIndex
          }
        }
        return prevIndex + 1
      })
    }, options.speed)

    return () => clearInterval(typewriteInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDisplayText((pre) => pre + text[currentIndex])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(
        styles['sekai-typewrite-text'],
        {
          [styles['sekai-cursor']]: viewCursor,
        },
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {displayText}
    </div>
  )
}
