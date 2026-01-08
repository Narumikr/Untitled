import React, { createContext } from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import globalStyles from '@/styles/global.module.scss'

import styles from './List.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export const ListContext = createContext<boolean>(false)

export interface ListProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLUListElement | HTMLOListElement>
  children: React.ReactNode
  as?: 'ul' | 'ol'
  noBullet?: boolean
}

export const List = ({
  sekai,
  themeMode,
  children,
  as = 'ul',
  noBullet = true,
  ...rest
}: ListProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const Component = as
  const optionStyle = {
    '--sekai-color': sekaiColor,
  }
  const listStyleType = noBullet ? 'none' : undefined
  const paddingLeft = noBullet ? '16px' : '36px'

  return (
    <ListContext.Provider value={true}>
      <Component
        {...rest}
        ref={rest.ref as React.Ref<HTMLUListElement & HTMLOListElement>}
        className={clsx(
          globalStyles[`sekai-color-${modeTheme}`],
          styles['sekai-list'],
          rest.className,
        )}
        style={{
          listStyleType: listStyleType,
          paddingLeft: paddingLeft,
          ...(optionStyle as React.CSSProperties),
          ...rest.style,
        }}>
        {children}
      </Component>
    </ListContext.Provider>
  )
}
