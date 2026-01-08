import React, { useEffect, useState } from 'react'

import clsx from 'clsx'

import { CompactDiscIcon } from '@/img/compactDisc'
import { EqualizerIcon } from '@/img/equalizer'
import { fireOnEnterKey } from '@/utils/operation'

import { Card, CardContent } from './Card'
import { MarqueeText } from '../text/MarqueeText'

import styles from './MusicBannerCard.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

type MusicBannerCardVariants = 'default' | 'view-all'
export interface MusicBannerCardProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  musicTitle: string
  artist: string
  selected?: boolean
  onSelect?: (select: boolean) => void
  onClick?: () => void
  onBlur?: () => void
  onMouseLeave?: () => void
  variants?: MusicBannerCardVariants
}

export const MusicBannerCard = ({
  sekai,
  themeMode,
  musicTitle,
  artist,
  selected = false,
  onSelect,
  onClick,
  onBlur,
  onMouseLeave,
  variants = 'default',
  ...rest
}: MusicBannerCardProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected)

  useEffect(() => {
    setIsSelected(selected)
  }, [selected])

  const handleChangeSelect = (select: boolean) => {
    setIsSelected(select)
    onSelect?.(select)
  }

  return (
    <Card
      {...rest}
      ref={rest.ref}
      role="button"
      tabIndex={0}
      sekai={sekai}
      themeMode={themeMode}
      style={{ ...rest.style }}
      className={clsx(
        styles['sekai-music-banner-card'],
        {
          [styles['sekai-music-card-selected']]: isSelected,
        },
        rest.className,
      )}
      onClick={onClick}
      onKeyDown={onClick ? fireOnEnterKey<HTMLDivElement>(onClick) : undefined}
      onFocus={() => handleChangeSelect(true)}
      onBlur={onBlur}
      onMouseEnter={() => handleChangeSelect(true)}
      onMouseLeave={onMouseLeave}>
      <CardContent
        id={rest.id ?? `${rest.id}-content`}
        className={clsx(styles['sekai-music-banner-card-content'], {
          [styles['sekai-music-card-selected']]: isSelected,
        })}>
        <CardIcon selected={isSelected} sekai={sekai} themeMode={themeMode} />
        <CardDetails
          musicTitle={musicTitle}
          artist={artist}
          selected={isSelected}
          variants={variants}
        />
      </CardContent>
    </Card>
  )
}

interface CardIconProps {
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  selected?: boolean
}
const CardIcon = ({ sekai, themeMode, selected }: CardIconProps) => {
  return (
    <div className={clsx(styles['sekai-music-card-icon-wrapper'])}>
      <EqualizerIcon
        sekai={sekai}
        themeMode={themeMode}
        className={clsx(styles['sekai-music-card-icon'], {
          [styles['sekai-music-card-icon-visible']]: selected,
        })}
      />
      <CompactDiscIcon
        sekai={sekai}
        themeMode={themeMode}
        className={clsx(styles['sekai-music-card-icon'], {
          [styles['sekai-music-card-icon-visible']]: !selected,
        })}
      />
    </div>
  )
}

interface CardDetailsProps {
  musicTitle: string
  artist: string
  selected?: boolean
  variants?: MusicBannerCardVariants
}
const CardDetails = ({ musicTitle, artist, selected, variants }: CardDetailsProps) => {
  return (
    <div className={clsx(styles['sekai-music-details'])}>
      <MarqueeText className={clsx(styles['sekai-music-card-detail-title'])}>
        {musicTitle}
      </MarqueeText>
      <MarqueeText
        className={clsx(styles['sekai-music-card-detail-artist'], {
          [styles['sekai-music-card-detail-artist-selected']]:
            selected || 'view-all' === variants,
        })}>
        {artist}
      </MarqueeText>
    </div>
  )
}
