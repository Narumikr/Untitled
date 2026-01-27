import React, { useEffect, useMemo } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'
import { DialogButtons, DialogTitleHeader, type DialogSize } from '@/components/dialog/Dialog'

import { LIGHT_MODE, type PaletteMode } from '@/hooks/useThemeMode'
import { XoMikuSvg } from '@/img/xomiku'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { fireOnEscapeKey } from '@/utils/operation'

import styles from './XoMikuDialog.module.scss'

import type { DialogButton } from '@/components/dialog/Dialog'

export interface XoMikuDialogProps {
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

export const XoMikuDialog = ({
  open,
  themeMode,
  children,
  size = 'medium',
  containerComponent,
  onClose,
  title,
  buttons,
  ...rest
}: XoMikuDialogProps) => {
  const portalContainer = usePortalContainer(containerComponent)

  useEffect(() => {
    if (!open) return
    const handleKeyDownEsc = fireOnEscapeKey(onClose)

    document.addEventListener('keydown', handleKeyDownEsc)

    return () => document.removeEventListener('keydown', handleKeyDownEsc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const headerProps = { size, onClose, title }
  const xoButtonProps = useMemo(
    () =>
      buttons?.map((button) => {
        const type = button.type ? button.type : 'normal'
        return {
          ...button,
          buttonStyle: clsx(styles[`sekai-xomiku-${type}-button`]),
        }
      }),
    [buttons],
  )

  const overlayProps = {
    id: 'xomiku-dialog-overlay',
    open,
    themeMode,
    containerComponent,
    centered: true,
  }
  const buttonsProps = { themeMode: LIGHT_MODE as PaletteMode, buttons: xoButtonProps }

  if (!portalContainer) return null

  return createPortal(
    <Backdrop {...overlayProps}>
      <div
        {...rest}
        role="dialog"
        ref={rest.ref}
        className={clsx(styles[`sekai-container-${size}`], rest.className)}
        aria-label={title || 'Dialog'}>
        <XoMikuSvg className={styles[`sekai-xomiku-svg-1-${size}`]} />
        <XoMikuSvg className={styles[`sekai-xomiku-svg-2-${size}`]} />
        <XoMikuSvg className={styles[`sekai-xomiku-svg-3-${size}`]} type={'type2'} />
        <XoMikuSvg className={styles[`sekai-xomiku-svg-4-${size}`]} type={'type2'} />
        <XoMikuSvg className={styles[`sekai-xomiku-svg-5-${size}`]} type={'type2'} />
        <div className={styles['sekai-content-wrap']}>
          <DialogTitleHeader id="xo-miku-dialog-header" {...headerProps} />
          {children}
          <DialogButtons
            id="xo-miku-dialog-buttons"
            className={styles['sekai-xomiku-button']}
            {...buttonsProps}
          />
        </div>
      </div>
    </Backdrop>,
    portalContainer,
  )
}
