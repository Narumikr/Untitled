import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { ChevronSvg } from '@/img/chevron'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import styles from './ScrollTopButton.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type ScrollTopPos = 'bottom-right' | 'bottom-left'

export interface ScrollTopButtonProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLButtonElement>
  pos?: ScrollTopPos
}

export const ScrollTopButton = ({
  sekai,
  themeMode,
  pos = 'bottom-right',
  ...rest
}: ScrollTopButtonProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return createPortal(
    <button
      {...rest}
      ref={rest.ref}
      className={clsx(styles[`sekai-scroll-top-button-${pos}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      onClick={handleScroll}>
      <ChevronSvg
        className={clsx(styles['sekai-scroll-top-icon'])}
        sekai={sekai}
        themeMode={themeMode}
      />
    </button>,
    document.body,
  )
}
