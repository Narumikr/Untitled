import React from 'react'

import clsx from 'clsx'

import { NamePlate } from '@/components/text/NamePlate'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import globalStyles from '@/styles/global.module.scss'

import { Card } from './Card'
import { OutlineText } from '../text/OutlineText'

import styles from './PrskLinkCard.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface PrskLinkCardProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  height?: number
  width?: number
  onClick?: () => void
  title: string
  subText: string
  icon: string | React.ReactNode
}

export const PrskLinkCard = ({
  sekai,
  themeMode,
  height = 72,
  width = 160,
  onClick,
  title,
  subText,
  icon,
  ...rest
}: PrskLinkCardProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

  const optionStyle = {
    '--sekai-color': sekaiColor,
  }

  const cardSizeStyle = {
    height: `${height}px`,
    width: `${width}px`,
  }

  return (
    <Card {...rest} ref={rest.ref} sekai={sekai} themeMode={themeMode}>
      <button
        className={clsx(
          styles['sekai-prsk-link-card-button'],
          globalStyles[`sekai-color-${modeTheme}`],
        )}
        style={(optionStyle as React.CSSProperties, cardSizeStyle)}
        onClick={onClick}>
        <NamePlate
          id={`${rest.id ? rest.id : 'prsk-link-card'}-title`}
          className={clsx(
            styles['sekai-prsk-link-card-title'],
            styles[`sekai-title-effect-${modeTheme}`],
          )}
          sekai={sekai}
          themeMode={themeMode}
          text={title}
        />
        <OutlineText
          id={`${rest.id ? rest.id : 'prsk-link-card'}-subtext`}
          className={styles['sekai-prsk-link-card-subtext']}
          sekai={sekai}
          themeMode={themeMode}
          text={subText}
        />
        <div className={styles['sekai-prsk-link-card-icon']}>{getImgComponent(icon)}</div>
      </button>
    </Card>
  )
}

const getImgComponent = (icon: string | React.ReactNode) => {
  if (typeof icon === 'string') {
    return <img src={icon} alt="" />
  } else {
    return icon
  }
}
