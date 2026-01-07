import React, { useContext } from 'react'

import clsx from 'clsx'

import { ConsoleWarning } from '@/internal/logging'
import { useOptionalSekai } from '@/internal/useOptionalSekai'

import globalStyles from '@/styles/global.module.scss'

import { ListContext } from './List'

import styles from './List.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface ListItemTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLLIElement>
  children: React.ReactNode
  as?: 'p' | 'span'
  icon?: 'string' | React.ReactNode
}

export const ListItemText = ({
  sekai,
  themeMode,
  children,
  as = 'p',
  icon,
  ...rest
}: ListItemTextProps) => {
  const isListWrap = useContext(ListContext)
  if (!isListWrap) ConsoleWarning('⚠ Warning: <ListItemText> should be used inside <List>')

  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const isChildrenElement = hasReactElement(children)

  const Component = as
  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <li
      {...rest}
      ref={rest.ref}
      className={clsx(
        styles['sekai-list-item-text'],
        globalStyles[`sekai-color-${modeTheme}`],
        rest.className,
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      {getImgComponent(icon)}
      {isChildrenElement ? children : <Component>{children}</Component>}
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

const hasReactElement = (children: React.ReactNode) => {
  return React.Children.toArray(children).some((child) => React.isValidElement(child))
}
