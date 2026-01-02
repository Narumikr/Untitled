import React, { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'

import { LIGHT_MODE, type PaletteMode } from '@/hooks/useThemeMode'
import { BACKGROUND_DARK_MODE, BACKGROUND_LIGHT_MODE } from '@/internal/color.constant'
import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './MarqueeText.module.scss'

import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { JSX } from 'react'

export interface MarqueeTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  children: React.ReactNode
  duration?: number
  parentBackgroundColor?: string
}

export const MarqueeText = ({
  sekai,
  themeMode,
  children,
  duration,
  parentBackgroundColor,
  ...rest
}: MarqueeTextProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textWrapRef = useRef<HTMLElement | null>(null)
  const [excessiveLength, setExcessiveLength] = useState(false)
  const [durationState, setDurationState] = useState(duration ?? 0)

  const containerBackground = useMemo(() => {
    if (parentBackgroundColor) return parentBackgroundColor
    return getBackgroundColor(containerRef, modeTheme)
  }, [modeTheme, parentBackgroundColor])

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--background-color-container': containerBackground,
    '--scroll-duration': `${durationState}s`,
  }

  const clonedChildren = Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === 'string') {
      type Tag = typeof child.type
      type Props = JSX.IntrinsicElements[Tag & keyof JSX.IntrinsicElements]

      return React.cloneElement(child as React.ReactElement<React.PropsWithRef<Props>>, {
        ref: textWrapRef,
      })
    }

    return child
  })

  useEffect(() => {
    if (!textWrapRef.current || !containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (textWrapRef.current && containerRef.current) {
        const textRefWidth = textWrapRef.current.offsetWidth
        const containerRefWidth = containerRef.current.offsetWidth
        setExcessiveLength(textRefWidth > containerRefWidth)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [children])

  useEffect(() => {
    if (duration) return
    if (textWrapRef.current && excessiveLength) {
      const calcDuration = textWrapRef.current.offsetWidth / 50
      setDurationState(calcDuration)
    }
  }, [duration, excessiveLength])

  return (
    <div
      {...rest}
      ref={containerRef}
      className={clsx(
        styles['sekai-marquee-text'],
        {
          [styles['sekai-marquee-text-scroll']]: excessiveLength,
          [styles['sekai-marquee-text-wrap-comp']]: isValidElement(children),
        },
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {isValidElement(children) ? (
        <div className={clsx(styles['sekai-marquee-text-wrap'])}>{clonedChildren}</div>
      ) : (
        <span ref={textWrapRef} className={clsx(styles['sekai-marquee-text-string'])}>
          {children}
        </span>
      )}
    </div>
  )
}

const getBackgroundColor = (
  element: React.MutableRefObject<HTMLDivElement | null>,
  mode: PaletteMode,
) => {
  if (element.current) {
    const computedStyle = getComputedStyle(element.current)
    const bgColor = computedStyle.backgroundColor
    if (
      bgColor &&
      bgColor !== 'rgba(0, 0, 0, 0)' &&
      bgColor !== 'transparent' &&
      bgColor !== 'initial'
    ) {
      return bgColor
    }
  }
  return mode === LIGHT_MODE ? BACKGROUND_LIGHT_MODE : BACKGROUND_DARK_MODE
}
