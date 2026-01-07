import React from 'react'

import clsx from 'clsx'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './UtilText.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface BodyTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLParagraphElement>
  children?: React.ReactNode
}

export const BodyText = ({ themeMode, children, ...rest }: BodyTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <p
      {...rest}
      ref={rest.ref}
      className={clsx(
        styles[`sekai-body-text-${modeTheme}`],
        globalStyles['text-responsible-body'],
        rest.className,
      )}>
      {children}
    </p>
  )
}

export interface SekaiBodyTextProps extends BodyTextProps {
  sekai?: ColorsSekaiKey
}

export const SekaiBodyText = ({ sekai, children, ...rest }: SekaiBodyTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai })

  const colorStyle = {
    color: sekaiColor,
  }

  return (
    <BodyText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </BodyText>
  )
}

export interface DetailTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLParagraphElement>
  children?: React.ReactNode
}

export const DetailText = ({ themeMode, children, ...rest }: DetailTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <p
      {...rest}
      ref={rest.ref}
      className={clsx(
        styles[`sekai-detail-text-${modeTheme}`],
        globalStyles['text-xs'],
        rest.className,
      )}>
      {children}
    </p>
  )
}

export interface SekaiDetailTextProps extends DetailTextProps {
  sekai?: ColorsSekaiKey
}

export const SekaiDetailText = ({ sekai, children, ...rest }: SekaiDetailTextProps) => {
  const { sekaiColor } = useOptionalSekai({ sekai })

  const colorStyle = {
    color: sekaiColor,
  }

  return (
    <DetailText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </DetailText>
  )
}

export interface AnnotationTextProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLParagraphElement>
  children?: React.ReactNode
}

export const AnnotationText = ({ themeMode, children, ...rest }: AnnotationTextProps) => {
  const { modeTheme } = useOptionalSekai({ mode: themeMode })

  return (
    <DetailText
      {...rest}
      className={clsx(styles[`sekai-annotation-text-${modeTheme}`], rest.className)}>
      {children}
    </DetailText>
  )
}

export interface SekaiAnnotationTextProps extends AnnotationTextProps {
  sekai?: ColorsSekaiKey
}

export const SekaiAnnotationText = ({ sekai, children, ...rest }: SekaiAnnotationTextProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai })
  const annotationColor = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)

  const colorStyle = {
    color: annotationColor,
  }

  return (
    <DetailText {...rest} style={{ ...(colorStyle as React.CSSProperties), ...rest.style }}>
      {children}
    </DetailText>
  )
}
