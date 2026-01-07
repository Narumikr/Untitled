import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import styles from './Breadcrumb.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

type SeparatorVariant = 'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe'

const separatorMap: Record<SeparatorVariant, string> = {
  slash: '/',
  arrow: '→',
  chevron: '>',
  dot: '•',
  pipe: '|',
}

export interface BreadcrumbProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLElement>
  children: React.ReactNode
  separator?: SeparatorVariant
}

export const Breadcrumb = ({
  sekai,
  themeMode,
  children,
  separator = 'slash',
  ...rest
}: BreadcrumbProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const items = React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      const el = child as React.ReactElement<{ children?: React.ReactNode }>
      return React.Children.toArray(el.props.children)
    }
    return [child]
  })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  return (
    <nav
      {...rest}
      ref={rest.ref}
      aria-label={`breadcrumb-${rest.id}`}
      className={clsx(styles['sekai-breadcrumb'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <ol>
        {items.map((el, idx) => (
          <li
            key={`breadcrumb-item-${idx}`}
            className={clsx(
              styles['sekai-breadcrumb-item'],
              styles[`sekai-breadcrumb-text-${modeTheme}`],
            )}>
            {el}
            {idx < items.length - 1 && (
              <span className={clsx(styles['sekai-breadcrumb-separator'])}>
                {separatorMap[separator]}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
