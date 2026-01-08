import React, { useEffect } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgba } from '@/utils/converter'
import { fireOnEscapeKey } from '@/utils/operation'

import globalStyles from '@/styles/global.module.scss'

import styles from './Dialog.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type DialogSize = 'narrow' | 'medium' | 'wide'

export type DialogButtonType = 'normal' | 'strong'
export interface DialogButton {
  text: string
  onClick: () => void
  type?: DialogButtonType
  disabled?: boolean
  ariaLabel?: string
  buttonStyle?: string
}

export interface DialogProps {
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
  title?: string
  showCloseIcon?: boolean
  buttons?: DialogButton[]
  dialogButtons?: React.ReactNode
}

export const Dialog = ({
  sekai,
  themeMode,
  open,
  children,
  containerComponent,
  size = 'medium',
  onClose,
  title,
  showCloseIcon = false,
  buttons,
  dialogButtons,
  ...rest
}: DialogProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  useEffect(() => {
    if (!open) return
    const handleKeyDownEsc = fireOnEscapeKey(onClose)

    document.addEventListener('keydown', handleKeyDownEsc)

    return () => document.removeEventListener('keydown', handleKeyDownEsc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const overlayProps = { open, themeMode, containerComponent }
  const headerProps = { sekai, themeMode, size, onClose, title, showCloseIcon }
  const buttonsProps = { sekai, themeMode, buttons }

  if (!portalContainer) return null

  return createPortal(
    <Backdrop {...overlayProps} centered>
      <div
        {...rest}
        ref={rest.ref}
        role="dialog"
        className={clsx(
          globalStyles[`sekai-color-${modeTheme}`],
          styles[`sekai-container-${size}`],
          rest.className,
        )}
        style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
        aria-label={title || 'Dialog'}>
        <div className={styles['sekai-content-wrap']}>
          <DialogTitleHeader {...headerProps} />
          {children}
        </div>
        {dialogButtons || <DialogButtons {...buttonsProps} />}
      </div>
    </Backdrop>,
    portalContainer,
  )
}

export type DialogTitleHeaderProps = Pick<
  DialogProps,
  'sekai' | 'themeMode' | 'size' | 'onClose' | 'title' | 'showCloseIcon'
> & { id?: string; className?: string; style?: React.CSSProperties }

export const DialogTitleHeader = ({
  sekai,
  themeMode,
  size,
  onClose,
  title,
  showCloseIcon,
  ...rest
}: DialogTitleHeaderProps) => {
  if (!title && !showCloseIcon) return null

  return (
    <div {...rest} className={clsx(styles[`sekai-title-header-${size}`], rest.className)}>
      <h2>{title}</h2>
      {showCloseIcon ? (
        <button type="button" className={styles['sekai-close-icon']} onClick={onClose}>
          <ClearSvg sekai={sekai} themeMode={themeMode} />
        </button>
      ) : null}
    </div>
  )
}

export type DialogButtonsProps = Pick<DialogProps, 'sekai' | 'themeMode' | 'buttons'> & {
  id?: string
  className?: string
  style?: React.CSSProperties
}

export const DialogButtons = ({ sekai, themeMode, buttons, ...rest }: DialogButtonsProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  if (!buttons || !buttons.length) return null

  const buttonLength = buttons.length
  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)
  const sekaiColorStrongHover = convertHexToRgba(sekaiColor, 0.8)
  const sekaiColorStrongDisabled = convertHexToRgba(sekaiColor, 0.5)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
    '--sekai-color-strong-hover': sekaiColorStrongHover,
    '--sekai-color-disabled': sekaiColorStrongDisabled,
  }

  return (
    <div {...rest} className={clsx(styles['sekai-buttons-area'], rest.className)}>
      {[...buttons.slice(0, 2)].map((el, index) => (
        <button
          id={`${rest.id ? rest.id : 'dialog-button'}-${index + 1}`}
          key={el.text}
          type="button"
          onClick={el.onClick}
          disabled={Boolean(el.disabled)}
          aria-label={el.ariaLabel || el.text}
          className={clsx(
            globalStyles[`sekai-color-${modeTheme}`],
            styles[`sekai-dialog-${el.type || 'normal'}-button-${buttonLength}-${index}`],
            styles[`sekai-${modeTheme}`],
            el.buttonStyle || '',
          )}
          style={optionStyle as React.CSSProperties}>
          {el.text}
        </button>
      ))}
    </div>
  )
}
