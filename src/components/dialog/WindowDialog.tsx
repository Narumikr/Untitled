import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { ClearSvg } from '@/img/clear'
import { RestoreSvg } from '@/img/restore'
import { SquareSvg } from '@/img/square'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import styles from './WindowDialog.module.scss'

import type { DialogSize } from './Dialog'
import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface WindowDialogProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  open: boolean
  children: React.ReactNode
  containerComponent?: HTMLElement
  size?: DialogSize
  onClose: () => void
}

export const WindowDialog = ({
  sekai,
  themeMode,
  ref,
  open,
  children,
  containerComponent,
  size = 'medium',
  onClose,
  ...rest
}: WindowDialogProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const displayDialog = open ? 'sekai-dialog-visible' : 'sekai-dialog-hidden'
  const portalContainer = usePortalContainer(containerComponent)

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.3, isLight)
  const sekaiColorHeader = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const windowInitCoordinate = () => {
    return { x: '50%', y: '50%' }
  }
  const [position, setPosition] = useState<{ x: string; y: string }>(() =>
    windowInitCoordinate(),
  )

  const modalRef = useRef<HTMLDivElement>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  // Merge internal ref and forwarded ref
  const setRefs = useCallback(
    (element: HTMLDivElement | null) => {
      modalRef.current = element

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ;(ref as React.RefObject<HTMLDivElement | null>).current = element
      }
    },
    [ref],
  )

  const [isFullscreen, setIsFullscreen] = useState(false)

  const onMouseDown = (e: React.MouseEvent) => {
    const rect = modalRef.current?.getBoundingClientRect()
    if (!rect) return
    setDragging(true)
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
  const closeWindow = () => {
    onClose()
    setPosition(windowInitCoordinate())
    setIsFullscreen(false)
  }

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || isFullscreen || !portalContainer) return
      const portalRect = portalContainer.getBoundingClientRect()

      const x = e.clientX - portalRect.left - dragOffset.x
      const y = e.clientY - portalRect.top - dragOffset.y

      setPosition({ x: `${x}px`, y: `${y}px` })
    },
    [dragOffset.x, dragOffset.y, dragging, isFullscreen, portalContainer],
  )

  const onMouseUp = () => setDragging(false)

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [dragging, onMouseMove])

  const optionStyle = useMemo(
    () => ({
      '--sekai-color': sekaiColor,
      '--sekai-color-bg': sekaiColorBg,
      '--sekai-color-header': sekaiColorHeader,
      ...(containerComponent && { position: 'absolute' }),
      'left': position.x,
      'top': position.y,
      'transform': position.x === '50%' && !isFullscreen ? 'translate(-50%, -50%)' : 'none',
    }),
    [
      containerComponent,
      isFullscreen,
      position.x,
      position.y,
      sekaiColor,
      sekaiColorBg,
      sekaiColorHeader,
    ],
  )

  if (!portalContainer) return null

  return createPortal(
    <div
      {...rest}
      ref={setRefs}
      role="dialog"
      className={clsx(
        styles[`sekai-window-dialog-${modeTheme}`],
        {
          [styles[`sekai-window-dialog-size-${size}`]]: !isFullscreen,
          [styles['sekai-window-dialog-fullscreen']]: isFullscreen,
        },
        styles[displayDialog],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <WindowHeader
        sekai={sekai}
        themeMode={themeMode}
        onClose={closeWindow}
        onMouseDown={onMouseDown}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />
      <div className={clsx(styles['sekai-window-dialog-container'])}>{children}</div>
    </div>,
    portalContainer,
  )
}

type WindowHeaderProps = Pick<WindowDialogProps, 'sekai' | 'themeMode' | 'onClose'> & {
  onMouseDown: (e: React.MouseEvent) => void
  isFullscreen: boolean
  setIsFullscreen: (fullscreen: boolean) => void
}
const WindowHeader = ({
  onMouseDown,
  isFullscreen,
  setIsFullscreen,
  ...rest
}: WindowHeaderProps) => {
  const onClick = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles['sekai-window-dialog-header']}
      onMouseDown={onMouseDown}>
      <button className={styles['sekai-window-dialog-button']} onClick={onClick}>
        {isFullscreen ? (
          <RestoreSvg {...rest} className={clsx(styles['sekai-window-dialog-icon'])} />
        ) : (
          <SquareSvg {...rest} className={clsx(styles['sekai-window-dialog-icon'])} />
        )}
      </button>
      <button className={styles['sekai-window-dialog-button']} onClick={rest.onClose}>
        <ClearSvg {...rest} className={clsx(styles['sekai-window-dialog-icon'])} />
      </button>
    </div>
  )
}
