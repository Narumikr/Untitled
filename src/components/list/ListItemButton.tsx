import React, { useCallback, useContext, useRef } from 'react'

import clsx from 'clsx'

import { ConsoleWarning } from '@/internal/logging'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import { ListContext } from './List'

import styles from './List.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface ListItemButtonProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLButtonElement>
  children: React.ReactNode
  icon?: 'string' | React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

const rippleEffectClassName = 'sekai-ripple'

export const ListItemButton = ({
  id,
  className,
  style,
  sekai,
  themeMode,
  ref,
  children,
  icon,
  disabled = false,
  onClick,
}: ListItemButtonProps) => {
  const isListWrap = useContext(ListContext)
  if (!isListWrap) ConsoleWarning('⚠ Warning: <ListItemButton> should be used inside <List>')

  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  const listItemButtonRef = useRef<HTMLButtonElement | null>(null)

  // Merge internal ref and forwarded ref
  const setRefs = useCallback(
    (element: HTMLButtonElement | null) => {
      listItemButtonRef.current = element

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ;(ref as React.RefObject<HTMLButtonElement | null>).current = element
      }
    },
    [ref],
  )

  const createRipple = (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>,
  ) => {
    const listItemButton = listItemButtonRef.current
    if (!listItemButton) return

    const rect = listItemButton.getBoundingClientRect() as DOMRect
    const size = Math.max(listItemButton.clientWidth, listItemButton.clientHeight)
    const { clientX, clientY } = getClientCoordinates(event)
    const x = clientX - rect.left - size / 2
    const y = clientY - rect.top - size / 2

    const ripple = createRippleEffect(x, y, size)

    removeRippleEffect(listItemButton)

    listItemButton.appendChild(ripple)

    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  }

  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>,
  ) => {
    createRipple(event)
    onClick?.()
  }

  return (
    <li
      id={id}
      className={clsx(styles['sekai-list-item-button'], className)}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      <button
        type="button"
        ref={setRefs}
        className={styles[`sekai-list-button-${modeTheme}`]}
        disabled={disabled}
        onClick={handleOnClick}>
        {getImgComponent(icon)}
        {children}
      </button>
    </li>
  )
}

const getImgComponent = (icon?: string | React.ReactNode) => {
  if (!icon) return null

  if (typeof icon === 'string') {
    return <img className={styles['sekai-list-icon']} src={icon} alt="" />
  } else {
    return icon
  }
}

const getClientCoordinates = (
  event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>,
) => {
  if ('clientX' in event) {
    return { clientX: event.clientX, clientY: event.clientY }
  }
  const touch = event.touches[0]
  return { clientX: touch.clientX, clientY: touch.clientY }
}

const createRippleEffect = (x: number, y: number, size: number) => {
  const ripple = document.createElement('span')
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.className = styles[`${rippleEffectClassName}`]

  return ripple
}

const removeRippleEffect = (element: HTMLElement) => {
  const ripple = element.getElementsByClassName(rippleEffectClassName)[0]
  if (ripple) ripple.remove()
}
