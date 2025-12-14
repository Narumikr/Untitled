import React, { useEffect } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { BodyText } from '@/components/text/UtilText'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Toast.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type ToastPosition = 'top' | 'bottom'

export interface ToastProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  open: boolean
  onClose: () => void
  pos?: ToastPosition
  message: string | string[]
  isError?: boolean
  duration?: number
  containerComponent?: HTMLElement
}

export const Toast = ({
  sekai,
  themeMode,
  open,
  onClose,
  pos = 'bottom',
  message,
  isError = false,
  duration = 3000,
  containerComponent,
  ...rest
}: ToastProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)
  const optionStyle = {
    '--sekai-color-bg': sekaiColorBg,
    ...(containerComponent && { position: 'absolute' }),
  }

  const displayMsg = Array.isArray(message) ? message : [message]

  useEffect(() => {
    const timer = open
      ? setTimeout(() => {
          onClose()
        }, duration)
      : undefined

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer)
      }
    }
  })

  if (!portalContainer) return null

  return createPortal(
    <div
      {...rest}
      className={clsx(
        styles[`sekai-toast-${pos}`],
        {
          [styles['sekai-toast-open']]: open,
        },
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <div className={clsx(styles['sekai-toast-message'])}>
        {displayMsg.map((msg) => (
          <BodyText
            key={msg}
            className={clsx(globalStyles[`sekai-text-${modeTheme}`], {
              [styles['sekai-toast-error']]: isError,
            })}>
            {msg}
          </BodyText>
        ))}
      </div>
      <button className={clsx(styles['sekai-toast-close-button'])} onClick={onClose}>
        <ClearSvg sekai={sekai} themeMode={themeMode} className={styles['sekai-toast-icon']} />
      </button>
    </div>,
    portalContainer,
  )
}
