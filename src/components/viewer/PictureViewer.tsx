import React, { useId, useState } from 'react'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { ClearSvg } from '@/img/clear'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'

import globalStyles from '@/styles/global.module.scss'

import styles from './PictureViewer.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface PictureViewerProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  imgSrc: string
  alt?: string
  width?: number
  containerComponent?: HTMLElement
}

export const PictureViewer = ({
  sekai,
  themeMode,
  imgSrc,
  alt = '',
  width = 210,
  containerComponent,
  ...rest
}: PictureViewerProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const portalContainer = usePortalContainer(containerComponent)
  const uniqueId = useId()

  const [isOpen, setIsOpen] = useState(false)

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }
  const posAbsoluteStyle = {
    ...(containerComponent && { position: 'absolute' }),
  }

  if (!portalContainer) return null

  return (
    <>
      {/* Thumbnail */}
      <motion.div
        {...rest}
        layoutId={`preview-image-${uniqueId}`}
        className={clsx(
          styles['sekai-picture-viewer-thumbnail'],
          styles[`sekai-picture-viewer-thumbnail-${modeTheme}`],
          rest.className,
        )}
        style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <img
          src={imgSrc}
          alt={alt}
          className={clsx(styles['sekai-thumbnail-image'])}
          width={width}
        />
      </motion.div>
      {/* Preview */}
      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <>
              <motion.div
                className={clsx(globalStyles[`sekai-overlay-${modeTheme}`])}
                style={posAbsoluteStyle as React.CSSProperties}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              <div
                className={clsx(styles['sekai-preview-container'])}
                style={{
                  ...(optionStyle as React.CSSProperties),
                  ...(posAbsoluteStyle as React.CSSProperties),
                }}>
                <motion.div
                  layoutId={`preview-image-${uniqueId}`}
                  className={clsx(styles['sekai-preview-image-wrapper'])}>
                  <img
                    src={imgSrc}
                    alt={alt}
                    className={clsx(
                      styles['sekai-preview-image'],
                      styles[`sekai-preview-image-${modeTheme}`],
                    )}
                  />
                </motion.div>
                <motion.button
                  className={clsx(styles['sekai-preview-close-btn'])}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <ClearSvg sekai={sekai} themeMode={themeMode} />
                </motion.button>
              </div>
            </>
          ) : null}
        </AnimatePresence>,
        portalContainer,
      )}
    </>
  )
}
