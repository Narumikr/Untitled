import React, { useEffect, useMemo } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'
import { DialogButtons, DialogTitleHeader, type DialogSize } from '@/components/dialog/Dialog'

import { XxMikuSvg } from '@/img/xxmiku'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { fireOnEscapeKey } from '@/utils/operation'

import styles from './XxMikuDialog.module.scss'

import type { DialogButton } from '@/components/dialog/Dialog'
import type { PaletteMode } from '@/hooks/useThemeMode'

export interface XxMikuDialogProps {
  open: boolean
  id?: string
  className?: string
  style?: React.CSSProperties
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  children: React.ReactNode
  size?: DialogSize
  containerComponent?: HTMLElement
  onClose: () => void
  title?: string
  buttons?: DialogButton[]
}

export const XxMikuDialog = ({
  open,
  themeMode,
  children,
  size = 'medium',
  containerComponent,
  onClose,
  title,
  buttons,
  ...rest
}: XxMikuDialogProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)

  useEffect(() => {
    if (!open) return
    const handleKeyDownEsc = fireOnEscapeKey(onClose)

    document.addEventListener('keydown', handleKeyDownEsc)

    return () => document.removeEventListener('keydown', handleKeyDownEsc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const headerProps = { themeMode, size, onClose, title }
  const xxButtonProps = useMemo(
    () =>
      buttons?.map((button) => {
        const type = button.type ? button.type : 'normal'
        return {
          ...button,
          buttonStyle: clsx(
            styles[`sekai-xxmiku-${type}-button`],
            styles[`sekai-${modeTheme}`],
          ),
        }
      }),
    [buttons, modeTheme],
  )

  const overlayProps = {
    id: 'xxmiku-dialog-overlay',
    open,
    themeMode,
    containerComponent,
    centered: true,
  }
  const buttonsProps = { themeMode, buttons: xxButtonProps }

  if (!portalContainer) return null

  return createPortal(
    <Backdrop {...overlayProps}>
      <div
        {...rest}
        role="dialog"
        ref={rest.ref}
        className={clsx(
          styles[`sekai-container-${size}`],
          styles[`sekai-${modeTheme}`],
          rest.className,
        )}
        aria-label={title || 'Dialog'}>
        <XxMikuSvg className={styles[`sekai-xxmiku-svg-1-${size}`]} />
        <XxMikuSvg className={styles[`sekai-xxmiku-svg-2-${size}`]} />
        <XxMikuSvg className={styles[`sekai-xxmiku-svg-3-${size}`]} type={'type2'} />
        <XxMikuSvg className={styles[`sekai-xxmiku-svg-4-${size}`]} type={'type2'} />
        <XxMikuSvg className={styles[`sekai-xxmiku-svg-5-${size}`]} type={'type2'} />
        <div className={styles['sekai-content-wrap']}>
          <DialogTitleHeader id="xo-miku-dialog-header" {...headerProps} />
          {children}
          <DialogButtons
            id="xo-miku-dialog-buttons"
            className={styles['sekai-xxmiku-button']}
            {...buttonsProps}
          />
        </div>
      </div>
    </Backdrop>,
    portalContainer,
  )
}
