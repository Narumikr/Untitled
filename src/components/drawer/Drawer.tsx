import React from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Drawer.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type DrawerPosition = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  open: boolean
  onClose: () => void
  children: React.ReactNode
  containerComponent?: HTMLElement
  pos?: DrawerPosition
}

export const Drawer = ({
  sekai,
  themeMode,
  open,
  onClose,
  children,
  containerComponent,
  pos = 'right',
  ...rest
}: DrawerProps) => {
  const displayDrawer = open ? 'sekai-drawer-visible' : 'sekai-drawer-hidden'
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const optionStyle = {
    '--sekai-color-bg': sekaiColorBg,
  }
  const posAbsoluteStyle = {
    ...(containerComponent && { position: 'absolute' }),
  }

  if (!portalContainer) return null

  return createPortal(
    <div
      ref={rest.ref}
      className={clsx(
        globalStyles[`sekai-overlay-${modeTheme}`],
        styles['sekai-drawer'],
        styles[displayDrawer],
      )}
      style={posAbsoluteStyle as React.CSSProperties}
      aria-hidden="true"
      onClick={onClose}>
      <div
        {...rest}
        className={clsx(
          styles[`sekai-drawer-contents-${pos}`],
          styles[displayDrawer],
          rest.className,
        )}
        style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
        role="presentation"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    portalContainer,
  )
}
