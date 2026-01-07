import React, { useContext } from 'react'

import clsx from 'clsx'

import { LIGHT_MODE } from '@/hooks/useThemeMode'
import { ConsoleWarning } from '@/internal/logging'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import { ListContext } from './List'
import { ListItemButton } from './ListItemButton'
import { ListItemText } from './ListItemText'

import styles from './StickyNote.module.scss'

import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface BaseProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export type StickyNoteProps =
  | ({ as?: 'button' } & BaseProps & { ref?: React.Ref<HTMLButtonElement> })
  | ({ as?: 'text' } & BaseProps & { ref?: React.Ref<HTMLLIElement> })

export const StickyNote = ({ sekai, children, as = 'button', ...rest }: StickyNoteProps) => {
  const isListWrap = useContext(ListContext)
  if (!isListWrap) ConsoleWarning('⚠ Warning: <StickyNote> should be used inside <List>')

  const stickyNoteContentsProps = { sekai, children }

  return 'button' === as ? (
    <ListItemButton
      {...rest}
      ref={rest.ref as React.Ref<HTMLButtonElement>}
      className={clsx(styles['sekai-sticky-note'], rest.className)}
      sekai={sekai}
      themeMode={LIGHT_MODE}>
      <StickyNoteContents {...stickyNoteContentsProps} />
    </ListItemButton>
  ) : (
    <ListItemText
      {...rest}
      ref={rest.ref as React.Ref<HTMLLIElement>}
      className={clsx(styles['sekai-sticky-note'], rest.className)}
      sekai={sekai}
      themeMode={LIGHT_MODE}>
      <StickyNoteContents {...stickyNoteContentsProps} />
    </ListItemText>
  )
}

interface StickyNoteContentsProps {
  sekai?: ColorsSekaiKey
  children: React.ReactNode
}
const StickyNoteContents = ({ sekai, children }: StickyNoteContentsProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai })

  const sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.6, isLight)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg,
  }

  return (
    <div
      className={styles['sekai-sticky-note-parts']}
      style={optionStyle as React.CSSProperties}>
      <div className={styles['sekai-sticky-note-design']} />
      {children}
    </div>
  )
}
