import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import styles from './Tooltip.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type TooltipPosition = 'top' | 'bottom'

export interface TooltipProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  children: React.ReactNode
  text: string
  pos?: TooltipPosition
}

export const Tooltip = ({
  sekai,
  themeMode,
  children,
  text,
  pos = 'top',
  ...rest
}: TooltipProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.2, isLight)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  const [visible, setVisible] = useState(false)

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(
        styles[`sekai-tooltip-${modeTheme}`],
        styles[`sekai-tooltip-${pos}`],
        rest.className,
      )}
      style={{ ...optionStyle, ...rest.style }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {children}
      {visible ? <SpeechBubble text={text} pos={pos} themeMode={modeTheme} /> : null}
    </div>
  )
}

interface SpeechBubbleProps {
  text: string
  pos: TooltipPosition
  themeMode: PaletteMode
}

const SpeechBubble = ({ text, pos, themeMode }: SpeechBubbleProps) => {
  const PADDING = 32
  const MAX_WIDTH = 300
  const speechBubbleRef = useRef<HTMLDivElement>(null)
  const [calcPosition, setCalcPosition] = useState<TooltipPosition>(pos)
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const bubble = speechBubbleRef.current
    if (!bubble) return

    const bubbleRect = bubble.getBoundingClientRect()
    const viewInnerWidth = window.innerWidth
    const viewInnerHeight = window.innerHeight

    const isRightOverflow = bubbleRect.right > viewInnerWidth
    const isLeftOverflow = bubbleRect.left < 0

    setBubbleStyle({
      ...(isRightOverflow && {
        right: 0,
        left: 'auto',
        transform: 'none',
      }),
      ...(isLeftOverflow && {
        left: 0,
        right: 'auto',
        transform: 'none',
      }),
      maxWidth: `${Math.min(viewInnerWidth - PADDING * 2, MAX_WIDTH)}px`,
    })

    if (bubbleRect.top < 0) {
      setCalcPosition('bottom')
    } else if (bubbleRect.bottom > viewInnerHeight) {
      setCalcPosition('top')
    } else {
      setCalcPosition(pos)
    }
  }, [pos])

  return (
    <div
      ref={speechBubbleRef}
      className={clsx(styles[`sekai-tooltip-speech-bubble-${calcPosition}`])}
      style={bubbleStyle}>
      <span className={styles[`sekai-tooltip-speech-bubble-text-${themeMode}`]}>{text}</span>
    </div>
  )
}
