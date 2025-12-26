import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { HamburgerButton } from '@/components/button/HamburgerButton'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './SideMenu.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface SideMenuProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  open?: boolean
  onClick?: () => void
  children?: React.ReactNode
  pos?: 'left' | 'right'
  containerComponent?: HTMLElement
}

export const SideMenu = ({
  sekai,
  themeMode,
  open = false,
  onClick,
  children,
  pos = 'left',
  containerComponent,
  ...rest
}: SideMenuProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const [isOpen, setIsOpen] = useState(open)
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  const posAbsoluteStyle = {
    ...(containerComponent && { position: 'absolute' }),
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClick?.()
  }

  if (!portalContainer) return null

  return createPortal(
    <div
      {...rest}
      className={clsx(
        styles[`sekai-side-menu-${pos}`],
        {
          [styles['sekai-side-menu-open']]: isOpen,
          [styles['sekai-side-menu-closed']]: !isOpen,
        },
        rest.className,
      )}
      style={{
        ...(optionStyle as React.CSSProperties),
        ...(posAbsoluteStyle as React.CSSProperties),
        ...rest.style,
      }}>
      <HamburgerButton
        id={rest.id ? `${rest.id}-side-menu-btn` : 'sekai-side-menu-btn'}
        className={clsx(styles['sekai-side-menu-hamburger-btn'])}
        sekai={sekai}
        themeMode={themeMode}
        open={isOpen}
        onClick={handleClick}
      />
      <div
        className={clsx(
          globalStyles['sekai-invisible-scroll'],
          styles['sekai-side-menu-contents'],
        )}>
        {children}
      </div>
    </div>,
    portalContainer,
  )
}
